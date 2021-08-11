package com.averude.uksatse.scheduler.microservice.workschedule.service;

import com.averude.uksatse.scheduler.core.model.dto.EmployeePositionStat;
import com.averude.uksatse.scheduler.core.model.dto.EmployeeScheduleDTO;
import com.averude.uksatse.scheduler.core.model.dto.EmployeeWorkStatDTO;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.interval.GenerationInterval;
import com.averude.uksatse.scheduler.microservice.workschedule.repository.SpecialCalendarDateRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.repository.SummationColumnRepository;
import com.averude.uksatse.scheduler.statistics.builder.CountMapBuilder;
import com.averude.uksatse.scheduler.statistics.builder.PositionIntervalMapBuilder;
import com.averude.uksatse.scheduler.statistics.calculator.StatisticsCalculator;
import com.averude.uksatse.scheduler.statistics.exceptions.UnsupportedSummationCalculationModeException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
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
        var specialCalendarDates = specialCalendarDateRepository.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
        var summationColumns = summationColumnRepository.findAllByEnterpriseId(enterpriseId);
        if (summationColumns == null || summationColumns.isEmpty()) {
            return null;
        }

        var scheduleDTO = scheduleService.findAllDTOByDepartmentIdAndDate(departmentId, from, to);

        return getSummationDTOS(from, to, mode, specialCalendarDates, summationColumns, scheduleDTO);
    }

    @Override
    public List<EmployeeWorkStatDTO> findAllByShiftIdsAndDateBetween(Long enterpriseId,
                                                                     List<Long> shiftIds,
                                                                     LocalDate from,
                                                                     LocalDate to,
                                                                     String mode) {
        var specialCalendarDates = specialCalendarDateRepository.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
        var summationColumns = summationColumnRepository.findAllByEnterpriseId(enterpriseId);
        if (summationColumns == null || summationColumns.isEmpty()) {
            return null;
        }

        var scheduleDTO = scheduleService.findScheduleDTOByShiftIdsAndDate(shiftIds, from, to);

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
        var result = new LinkedList<EmployeeWorkStatDTO>();

        for (var dto : dtos) {
            var workStatDTO = new EmployeeWorkStatDTO();
            workStatDTO.setEmployee(dto.getParent());
            workStatDTO.setShiftId(getShiftId(dto));
            workStatDTO.setPositionStats(new LinkedList<>());

            var positionIntervalsMap = intervalMapBuilder
                    .getPositionIntervalsMap(from, to, dto.getMainCompositions(), dto.getSubstitutionCompositions());

            positionIntervalsMap.forEach(((positionId, generationIntervals) -> {
                var positionStatistics = getPositionStatistics(dto, positionId, generationIntervals, specialCalendarDates, summationColumns);
                workStatDTO.getPositionStats().add(positionStatistics);
            }));

            result.add(workStatDTO);
        }

        return result;
    }

    private List<EmployeeWorkStatDTO> getOverallSummationDTOs(List<EmployeeScheduleDTO> dtos,
                                                              List<SummationColumn> summationColumns,
                                                              List<SpecialCalendarDate> specialCalendarDates) {
        return dtos.stream()
                .map(dto -> {
                    var countMap = countMapBuilder.build(dto.getCollection(), specialCalendarDates);
                    var results = statisticsCalculator.calculateByCountMap(countMap, summationColumns);

                    var workStatDTO = new EmployeeWorkStatDTO();
                    workStatDTO.setEmployee(dto.getParent());
                    workStatDTO.setShiftId(getShiftId(dto));

                    var positionStatistics = new EmployeePositionStat();
                    positionStatistics.setPositionId(getPositionId(dto));
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
        var countMap = countMapBuilder.build(dto.getCollection(), generationIntervals, specialCalendarDates);
        var summationResults = statisticsCalculator.calculateByCountMap(countMap, summationColumns);

        var positionWorkStat = new EmployeePositionStat();
        positionWorkStat.setPositionId(positionId);
        positionWorkStat.setSummations(summationResults);

        return positionWorkStat;
    }

    // TODO: Rewrite with the usage of last time rather than position in array
    private Long getPositionId(EmployeeScheduleDTO dto) {
        Long result = null;

        var mainCompositions = dto.getMainCompositions();
        var substitutionCompositions = dto.getSubstitutionCompositions();

        int lastMainIndex = mainCompositions.size() - 1;
        if (lastMainIndex >= 0) {
            result =mainCompositions.get(lastMainIndex).getPositionId();
        } else {
            int lastSubIndex = substitutionCompositions.size() - 1;
            if (lastSubIndex >= 0) {
                result = substitutionCompositions.get(lastSubIndex)
                        .getMainComposition()
                        .getPositionId();
            }
        }

        return result;
    }

    // TODO: Rewrite with the usage of last time rather than position in array
    private Long getShiftId(EmployeeScheduleDTO dto) {
        Long result = null;

        var mainCompositions = dto.getMainCompositions();
        var substitutionCompositions = dto.getSubstitutionCompositions();

        int lastMainIndex = mainCompositions.size() - 1;
        if (lastMainIndex >= 0) {
            result = mainCompositions.get(lastMainIndex).getShiftId();
        } else {
            int lastSubIndex = substitutionCompositions.size() - 1;
            if (lastSubIndex >= 0) {
                result = substitutionCompositions.get(lastSubIndex)
                        .getMainComposition()
                        .getShiftId();
            }
        }

        return result;
    }
}
