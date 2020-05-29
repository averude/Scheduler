package com.averude.uksatse.scheduler.statistics.service;

import com.averude.uksatse.scheduler.core.dto.SummationDTO;
import com.averude.uksatse.scheduler.shared.service.ScheduleService;
import com.averude.uksatse.scheduler.shared.service.SummationColumnService;
import com.averude.uksatse.scheduler.statistics.calculator.StatisticsCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class SummationDTOServiceImpl implements SummationDTOService {

    private final StatisticsCalculator      statisticsCalculator;
    private final SummationColumnService    summationColumnService;
    private final ScheduleService           scheduleService;

    @Autowired
    public SummationDTOServiceImpl(StatisticsCalculator statisticsCalculator,
                                   SummationColumnService summationColumnService,
                                   ScheduleService scheduleService) {
        this.statisticsCalculator = statisticsCalculator;
        this.summationColumnService = summationColumnService;
        this.scheduleService = scheduleService;
    }

    @Override
    @Transactional
    public List<SummationDTO> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                  LocalDate from,
                                                                  LocalDate to) {
        var summationColumns = summationColumnService.findAllByDepartmentId(departmentId);
        if (summationColumns == null || summationColumns.size() == 0) {
            return null;
        }
        return scheduleService.findAllDtoByDepartmentIdAndDate(departmentId, from, to)
                .stream()
                .map(scheduleDTO -> new SummationDTO(scheduleDTO.getParent(), from, to,
                        statisticsCalculator.calcSum(summationColumns, scheduleDTO.getCollection())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<SummationDTO> findAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        var summationColumns = summationColumnService.findAllByShiftId(shiftId);
        if (summationColumns == null || summationColumns.size() == 0) {
            return null;
        }
        return scheduleService.findAllDtoByShiftIdAndDate(shiftId, from, to)
                .stream()
                .map(scheduleDTO -> new SummationDTO(scheduleDTO.getParent(), from, to,
                        statisticsCalculator.calcSum(summationColumns, scheduleDTO.getCollection())))
                .collect(Collectors.toList());
    }
}
