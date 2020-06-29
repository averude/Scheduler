package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.dto.SummationResult;
import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.util.TimeCalculator;
import com.averude.uksatse.scheduler.statistics.wrapper.WorkDayWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class StatisticsCalculatorImpl implements StatisticsCalculator {

    private TimeCalculator timeCalculator;

    @Autowired
    public StatisticsCalculatorImpl(TimeCalculator timeCalculator) {
        this.timeCalculator = timeCalculator;
    }

    @Override
    public List<SummationResult> calcSum(List<SummationColumn> summationColumns, List<WorkDay> workDays) {
        var set = getCountMap(workDays).entrySet();
        return summationColumns.stream()
                .map(column -> new SummationResult(column.getId(), calculateSum(set, column)))
                .collect(Collectors.toList());
    }

    private long calculateSum(Set<Map.Entry<WorkDayWrapper, Integer>> set, SummationColumn column) {
        var entryStream = set.stream();

        if (column.getDayTypeRanges() != null && !column.getDayTypeRanges().isEmpty()) {
            entryStream = entryStream
                    .filter(entry -> column.getDayTypeRanges()
                            .stream()
                            .anyMatch(dayTypeRange -> dayTypeRange.getDayTypeId()
                            .equals(entry.getKey().getWorkDay().getDayTypeId())));
        }

        if (column.getOnlyHolidays()) {
            entryStream = entryStream.filter(entry -> entry.getKey().getWorkDay().getHoliday());
        }

        return entryStream.mapToLong(entry -> getWorkDayLength(entry.getKey().getWorkDay(), column) * entry.getValue())
                .sum();
    }

    private Map<WorkDayWrapper, Integer> getCountMap(List<WorkDay> workDays) {
        Map<WorkDayWrapper, Integer> workDayCountMap = new HashMap<>();
        workDays.forEach(workDay -> workDayCountMap.merge(new WorkDayWrapper(workDay), 1, Integer::sum));
        return workDayCountMap;
    }

    private int getWorkDayLength(WorkDay workDay, SummationColumn summationColumn) {
        if (summationColumn.getDayTypeRanges() == null || summationColumn.getDayTypeRanges().isEmpty()) {
            return timeCalculator.getLength(workDay, null);
        } else {
            return summationColumn.getDayTypeRanges()
                    .stream()
                    .filter(range -> range.getDayTypeId().equals(workDay.getDayTypeId()))
                    .findFirst()
                    .map(range -> timeCalculator.getLength(workDay, range))
                    .orElse(0);
        }
    }
}
