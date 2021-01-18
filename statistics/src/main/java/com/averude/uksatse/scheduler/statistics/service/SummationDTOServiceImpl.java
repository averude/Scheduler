package com.averude.uksatse.scheduler.statistics.service;

import com.averude.uksatse.scheduler.core.model.dto.EmployeeScheduleDTO;
import com.averude.uksatse.scheduler.core.model.dto.SummationDTO;
import com.averude.uksatse.scheduler.core.model.dto.SummationResult;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.interval.GenerationInterval;
import com.averude.uksatse.scheduler.shared.repository.SpecialCalendarDateRepository;
import com.averude.uksatse.scheduler.shared.repository.SummationColumnRepository;
import com.averude.uksatse.scheduler.shared.service.ScheduleService;
import com.averude.uksatse.scheduler.statistics.builder.CountMapBuilder;
import com.averude.uksatse.scheduler.statistics.builder.PositionIntervalMapBuilder;
import com.averude.uksatse.scheduler.statistics.calculator.StatisticsCalculator;
import com.averude.uksatse.scheduler.statistics.exceptions.UnsupportedSummationCalculationModeException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SummationDTOServiceImpl implements SummationDTOService {

    private final StatisticsCalculator          statisticsCalculator;
    private final SummationColumnRepository     summationColumnRepository;
    private final ScheduleService               scheduleService;
    private final SpecialCalendarDateRepository specialCalendarDateRepository;
    private final CountMapBuilder               countMapBuilder;
    private final PositionIntervalMapBuilder    intervalMapBuilder;

    @Override
    @Transactional
    public List<SummationDTO> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                  LocalDate from,
                                                                  LocalDate to) {
        var specialCalendarDates = specialCalendarDateRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
        var summationColumns = summationColumnRepository.findAllByDepartmentId(departmentId);
        if (summationColumns == null || summationColumns.size() == 0) {
            return null;
        }

        var dtos = (List<EmployeeScheduleDTO>) scheduleService.findAllDtoByDepartmentIdAndDate(departmentId, from, to);
        return getOverallSummationDTOs(from, to, specialCalendarDates, summationColumns, dtos);
    }

    @Override
    @Transactional
    public List<SummationDTO> findAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        var specialCalendarDates = specialCalendarDateRepository.findAllByShiftIdAndDateBetween(shiftId, from, to);
        var summationColumns = summationColumnRepository.findAllByShiftId(shiftId);
        if (summationColumns == null || summationColumns.size() == 0) {
            return null;
        }
        var dtos = (List<EmployeeScheduleDTO>) scheduleService.findAllDtoByShiftIdAndDate(shiftId, from, to);
        return getOverallSummationDTOs(from, to, specialCalendarDates, summationColumns, dtos);
    }

    @Override
    public List<SummationDTO> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                  LocalDate from,
                                                                  LocalDate to,
                                                                  String mode) {
        var specialCalendarDates = specialCalendarDateRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
        var summationColumns = summationColumnRepository.findAllByDepartmentId(departmentId);
        if (summationColumns == null || summationColumns.isEmpty()) {
            return null;
        }

        var scheduleDTO = (List<EmployeeScheduleDTO>) scheduleService.findAllDtoByDepartmentIdAndDate(departmentId, from, to);

        return getSummationDTOS(from, to, mode, specialCalendarDates, summationColumns, scheduleDTO);
    }

    @Override
    public List<SummationDTO> findAllByShiftIdAndDateBetween(Long departmentId,
                                                             LocalDate from,
                                                             LocalDate to,
                                                             String mode) {
        var specialCalendarDates = specialCalendarDateRepository.findAllByShiftIdAndDateBetween(departmentId, from, to);
        var summationColumns = summationColumnRepository.findAllByShiftId(departmentId);
        if (summationColumns == null || summationColumns.isEmpty()) {
            return null;
        }

        var scheduleDTO = (List<EmployeeScheduleDTO>) scheduleService.findAllDtoByShiftIdAndDate(departmentId, from, to);

        return getSummationDTOS(from, to, mode, specialCalendarDates, summationColumns, scheduleDTO);
    }

    private List<SummationDTO> getSummationDTOS(LocalDate from,
                                                LocalDate to,
                                                String mode,
                                                List<SpecialCalendarDate> specialCalendarDates,
                                                List<SummationColumn> summationColumns,
                                                List<EmployeeScheduleDTO> scheduleDTO) {
        List<SummationDTO> result;

        switch (mode) {
            case "per_position" : {
                result = getPerPositionSummationDTOs(from, to, specialCalendarDates,
                        summationColumns, scheduleDTO);
                break;
            }

            case "overall" : {
                result = getOverallSummationDTOs(from, to, specialCalendarDates,
                        summationColumns, scheduleDTO);
                break;
            }

            default : {
                throw new UnsupportedSummationCalculationModeException();
            }
        }

        return result;
    }

    private List<SummationDTO> getPerPositionSummationDTOs(LocalDate from,
                                                           LocalDate to,
                                                           List<SpecialCalendarDate> specialCalendarDates,
                                                           List<SummationColumn> summationColumns,
                                                           List<EmployeeScheduleDTO> dtos) {
        var result = new LinkedList<SummationDTO>();

        for (var dto : dtos) {
            var positionIntervalsMap = intervalMapBuilder
                    .getPositionIntervalsMap(from, to, dto.getMainShiftCompositions(), dto.getSubstitutionShiftCompositions());

            positionIntervalsMap.forEach(((positionId, generationIntervals) -> {
                var summation = getSummationDTO(from, to, specialCalendarDates, summationColumns, dto, positionId, generationIntervals);
                setShiftId(dto, summation);
                result.add(summation);
            }));
        }

        return result;
    }

    private List<SummationDTO> getOverallSummationDTOs(LocalDate from,
                                                       LocalDate to,
                                                       List<SpecialCalendarDate> specialCalendarDates,
                                                       List<SummationColumn> summationColumns,
                                                       List<EmployeeScheduleDTO> dtos) {
        return dtos.stream()
                .map(dto -> {
                    var countMap = countMapBuilder.build(dto.getCollection(), specialCalendarDates);
                    var results = statisticsCalculator.calculateByCountMap(countMap, summationColumns);
                    var summationDTO = new SummationDTO(dto.getParent(), from, to, results);
                    setPositionId(dto, summationDTO);
                    setShiftId(dto, summationDTO);
                    return summationDTO;
                })
                .collect(Collectors.toList());
    }

    private void setPositionId(EmployeeScheduleDTO dto, SummationDTO summationDTO) {
        var mainCompositions = dto.getMainShiftCompositions();
        var substitutionCompositions = dto.getSubstitutionShiftCompositions();

        int lastMainIndex = mainCompositions.size() - 1;
        if (lastMainIndex >= 0) {
            summationDTO.setPositionId(mainCompositions.get(lastMainIndex).getPositionId());
        } else {
            int lastSubIndex = substitutionCompositions.size() - 1;
            if (lastSubIndex >= 0) {
                var positionId = substitutionCompositions.get(lastSubIndex)
                        .getMainShiftComposition()
                        .getPositionId();

                summationDTO.setPositionId(positionId);
            }
        }
    }

    private void setShiftId(EmployeeScheduleDTO dto, SummationDTO summationDTO) {
        var mainCompositions = dto.getMainShiftCompositions();
        var substitutionCompositions = dto.getSubstitutionShiftCompositions();

        int lastMainIndex = mainCompositions.size() - 1;
        if (lastMainIndex >= 0) {
            summationDTO.setShiftId(mainCompositions.get(lastMainIndex).getShiftId());
        } else {
            int lastSubIndex = substitutionCompositions.size() - 1;
            if (lastSubIndex >= 0) {
                var shiftId = substitutionCompositions.get(lastSubIndex)
                        .getMainShiftComposition()
                        .getShiftId();

                summationDTO.setShiftId(shiftId);
            }
        }
    }

    private SummationDTO getSummationDTO(LocalDate from,
                                         LocalDate to,
                                         List<SpecialCalendarDate> specialCalendarDates,
                                         List<SummationColumn> summationColumns,
                                         EmployeeScheduleDTO dto,
                                         Long positionId,
                                         List<GenerationInterval<Long>> generationIntervals) {
        var countMap = countMapBuilder.build(dto.getCollection(), generationIntervals, specialCalendarDates);
        var summationResults = statisticsCalculator.calculateByCountMap(countMap, summationColumns);

        return createSummationDTO(from, to, dto, positionId, summationResults);
    }

    private SummationDTO createSummationDTO(LocalDate from,
                                            LocalDate to,
                                            EmployeeScheduleDTO dto,
                                            Long positionId,
                                            List<SummationResult> summationResults) {
        var summation = new SummationDTO();
        summation.setParent(dto.getParent());
        summation.setPositionId(positionId);
        summation.setFrom(from);
        summation.setTo(to);
        summation.setCollection(summationResults);
        return summation;
    }
}
