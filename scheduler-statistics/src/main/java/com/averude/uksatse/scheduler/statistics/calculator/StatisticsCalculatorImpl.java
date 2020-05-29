package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.dto.SummationResult;
import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.statistics.wrapper.WorkDayWrapper;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class StatisticsCalculatorImpl implements StatisticsCalculator {

//    @Override
//    public List<SummationResult> calcSum(List<SummationColumn> summationColumns, List<WorkDay> workDays) {
//        return summationColumns.stream()
//                .map(column -> new SummationResult(column.getId(), workDays.stream()
//                        .filter(workDay -> column.getDayTypeRanges().stream()
//                                .anyMatch(dayTypeRange -> dayTypeRange.getDayTypeId()
//                                        .equals(workDay.getDayTypeId())))
//                        .mapToLong(workDay -> getWorkDayLength(workDay, column))
//                        .sum()))
//                .collect(Collectors.toList());
//    }

    @Override
    public List<SummationResult> calcSum(List<SummationColumn> summationColumns, List<WorkDay> workDays) {
        var set = getCountMap(workDays).entrySet();
        return summationColumns.stream()
                .map(column -> new SummationResult(column.getId(), set.stream()
                        .filter(entry -> column.getDayTypeRanges().stream()
                                .anyMatch(dayTypeRange -> dayTypeRange.getDayTypeId()
                                        .equals(entry.getKey().getWorkDay().getDayTypeId())))
                        .mapToLong(entry -> getWorkDayLength(entry.getKey().getWorkDay(), column) * entry.getValue())
                        .sum()))
                .collect(Collectors.toList());
    }

    private Map<WorkDayWrapper, Integer> getCountMap(List<WorkDay> workDays) {
        Map<WorkDayWrapper, Integer> workDayCountMap = new HashMap<>();
        workDays.forEach(workDay -> workDayCountMap.merge(new WorkDayWrapper(workDay), 1, Integer::sum));
        return workDayCountMap;
    }
}
