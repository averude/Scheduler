package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.service;

import com.averude.uksatse.scheduler.core.interfaces.entity.Composition;
import com.averude.uksatse.scheduler.core.model.dto.EmployeePositionStat;
import com.averude.uksatse.scheduler.core.model.dto.EmployeeScheduleDTO;
import com.averude.uksatse.scheduler.core.model.dto.EmployeeWorkStatDTO;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.interval.GenerationInterval;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.builder.CountMapBuilder;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.builder.PositionIntervalMapBuilder;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.calculator.StatisticsCalculator;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.exceptions.UnsupportedSummationCalculationModeException;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.service.ScheduleService;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.SpecialCalendarDateRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.SummationColumnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployeeWorkStatServiceImpl implements EmployeeWorkStatService {

    private final StatisticsCalculator          statisticsCalculator;
    private final SummationColumnRepository     summationColumnRepository;
    private final ScheduleService               scheduleService;
    private final SpecialCalendarDateRepository specialCalendarDateRepository;
    private final CountMapBuilder               countMapBuilder;
    private final PositionIntervalMapBuilder    intervalMapBuilder;

    @Override
    public List<EmployeeWorkStatDTO> findAllByDepartmentIdAndDateBetween(Long enterpriseId,
                                                                         Long departmentId,
                                                                         LocalDate from,
                                                                         LocalDate to,
                                                                         String mode) {
        return findAllByDateBetween(enterpriseId, from, to, mode, () -> scheduleService.findAllDTOByDepartmentIdAndDate(departmentId, from, to));
    }

    @Override
    public List<EmployeeWorkStatDTO> findAllByShiftIdsAndDateBetween(Long enterpriseId,
                                                                     List<Long> shiftIds,
                                                                     LocalDate from,
                                                                     LocalDate to,
                                                                     String mode) {
        return findAllByDateBetween(enterpriseId, from, to, mode, () -> scheduleService.findScheduleDTOByShiftIdsAndDate(shiftIds, from, to));
    }

    private List<EmployeeWorkStatDTO> findAllByDateBetween(Long enterpriseId,
                                                           LocalDate from,
                                                           LocalDate to,
                                                           String mode,
                                                           Supplier<List<EmployeeScheduleDTO>> supplier) {
        var specialCalendarDates = specialCalendarDateRepository.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
        var summationColumns = summationColumnRepository.findAllByEnterpriseId(enterpriseId);
        if (summationColumns == null || summationColumns.isEmpty()) {
            return null;
        }

        var scheduleDTO = supplier.get();

        return getSummationDTOS(from, to, mode, specialCalendarDates, summationColumns, scheduleDTO);
    }

    private List<EmployeeWorkStatDTO> getSummationDTOS(LocalDate from,
                                                       LocalDate to,
                                                       String mode,
                                                       List<SpecialCalendarDate> specialCalendarDates,
                                                       List<SummationColumn> summationColumns,
                                                       List<EmployeeScheduleDTO> scheduleDTO) {
        List<EmployeeWorkStatDTO> result;

        switch (mode) {
            case "per_position" : {
                result = getPerPositionSummationDTOs(from, to, specialCalendarDates, summationColumns, scheduleDTO);
                break;
            }

            case "overall" : {
                result = getOverallSummationDTOs(scheduleDTO, summationColumns, specialCalendarDates);
                break;
            }

            default : {
                throw new UnsupportedSummationCalculationModeException();
            }
        }

        return result;
    }

    private List<EmployeeWorkStatDTO> getPerPositionSummationDTOs(LocalDate from,
                                                                  LocalDate to,
                                                                  List<SpecialCalendarDate> specialCalendarDates,
                                                                  List<SummationColumn> summationColumns,
                                                                  List<EmployeeScheduleDTO> dtos) {
        return dtos.stream()
                .filter(dto -> validCollection(dto.getMainCompositions()) || validCollection(dto.getSubstitutionCompositions()))
                .map(dto -> {
                    var mainComposition = getLatestMainComposition(dto);

                    var workStatDTO = new EmployeeWorkStatDTO();
                    workStatDTO.setEmployeeId(dto.getEmployeeId());
                    workStatDTO.setShiftId(mainComposition.getShiftId());
                    workStatDTO.setMainPositionId(mainComposition.getPositionId());
                    workStatDTO.setPositionStats(new LinkedList<>());

                    var positionIntervalsMap = intervalMapBuilder
                            .getPositionIntervalsMap(from, to, dto.getMainCompositions(), dto.getSubstitutionCompositions());

                    positionIntervalsMap.forEach(((positionId, generationIntervals) -> {
                        var positionStatistics = getPositionStatistics(dto, positionId, generationIntervals, specialCalendarDates, summationColumns);
                        workStatDTO.getPositionStats().add(positionStatistics);
                    }));
                    return workStatDTO;
                })
                .collect(Collectors.toList());
    }

    private List<EmployeeWorkStatDTO> getOverallSummationDTOs(List<EmployeeScheduleDTO> dtos,
                                                              List<SummationColumn> summationColumns,
                                                              List<SpecialCalendarDate> specialCalendarDates) {
        return dtos.stream()
                .filter(dto -> validCollection(dto.getMainCompositions()) || validCollection(dto.getSubstitutionCompositions()))
                .map(dto -> {
                    var mainComposition = getLatestMainComposition(dto);
                    var countMap = countMapBuilder.build(dto.getWorkDays(), specialCalendarDates);
                    var results = statisticsCalculator.calculateByCountMap(countMap, summationColumns);

                    var workStatDTO = new EmployeeWorkStatDTO();
                    workStatDTO.setEmployeeId(dto.getEmployeeId());
                    workStatDTO.setShiftId(mainComposition.getShiftId());
                    workStatDTO.setMainPositionId(mainComposition.getPositionId());

                    var positionStatistics = new EmployeePositionStat();
                    positionStatistics.setPositionId(mainComposition.getPositionId());
                    positionStatistics.setSummations(results);
                    workStatDTO.setPositionStats(List.of(positionStatistics));

                    return workStatDTO;
                })
                .collect(Collectors.toList());
    }

    private EmployeePositionStat getPositionStatistics(EmployeeScheduleDTO dto,
                                                       Long positionId,
                                                       List<GenerationInterval<Long>> generationIntervals,
                                                       List<SpecialCalendarDate> specialCalendarDates,
                                                       List<SummationColumn> summationColumns) {
        var countMap = countMapBuilder.build(dto.getWorkDays(), generationIntervals, specialCalendarDates);
        var summationResults = statisticsCalculator.calculateByCountMap(countMap, summationColumns);

        var positionWorkStat = new EmployeePositionStat();
        positionWorkStat.setPositionId(positionId);
        positionWorkStat.setSummations(summationResults);

        return positionWorkStat;
    }

    private Composition getLatestMainComposition(EmployeeScheduleDTO dto) {
        var mainCompositions = dto.getMainCompositions();
        var substitutionCompositions = dto.getSubstitutionCompositions();

        if (validCollection(mainCompositions)) {
            return Collections
                    .max(mainCompositions, (a, b) -> (int) a.getFrom().until(b.getFrom(), ChronoUnit.DAYS));
        } else if (validCollection(substitutionCompositions)) {
            return Collections
                    .max(substitutionCompositions, (a, b) -> (int) a.getFrom().until(b.getFrom(), ChronoUnit.DAYS))
                    .getMainComposition();
        } else {
            throw new RuntimeException();
        }
    }

    private boolean validCollection(Collection collection) {
        return collection != null && !collection.isEmpty();
    }
}
