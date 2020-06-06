package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.dto.SummationResult;
import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.statistics.wrapper.WorkDayWrapper;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class StatisticsCalculatorImpl implements StatisticsCalculator {

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
        if (workDay.getStartTime() == null || workDay.getEndTime() == null) {
            return 0;
        }

        if (summationColumn.getDayTypeRanges() == null || summationColumn.getDayTypeRanges().isEmpty()) {
            return getLength(workDay, null);
        } else {
            return summationColumn.getDayTypeRanges()
                    .stream()
                    .filter(range -> range.getDayTypeId().equals(workDay.getDayTypeId()))
                    .findFirst()
                    .map(range -> getLength(workDay, range))
                    .orElse(0);
        }
    }

    private Integer getLength(WorkDay workDay, SummationColumnDayTypeRange range) {
        if (workDay.getBreakStartTime() != null && workDay.getBreakEndTime() != null) {
            int beforeBreak = getTimeLength(workDay.getStartTime(), workDay.getBreakStartTime(), range);
            int afterBreak = getTimeLength(workDay.getBreakEndTime(), workDay.getEndTime(), range);
            return beforeBreak + afterBreak;
        } else {
            return getTimeLength(workDay.getStartTime(), workDay.getEndTime(), range);
        }
    }

    private int getTimeLength(int x, int y, SummationColumnDayTypeRange columnDayTypeRange) {
        if (columnDayTypeRange == null) {
            return getTimeLength(x, y, null, null);
        } else {
            return getTimeLength(x, y, columnDayTypeRange.getFrom(), columnDayTypeRange.getTo());
        }
    }

    private int getTimeLength(Integer from, Integer to, Integer leftBound, Integer rightBound) {
        if (leftBound == null || rightBound == null) {
            return to - from;
        }

        int result  = 0;
        int limit   = 1;

        var intervals = new int[2][2];

        if (leftBound > rightBound) {
            intervals[0] = new int[]{leftBound, 1440};
            intervals[1] = new int[]{0, rightBound};
            limit = 2;
        } else {
            intervals[0] = new int[]{leftBound, rightBound};
        }

        for (int i = 0; i < limit; i++) {
            int right   = intervals[i][1];
            int left    = intervals[i][0];
            if (right <= from || left >= to) {
                continue;
            }
            result += (right >= to ? to : right) - (left <= from ? from : left);
        }
        return result;
    }
}
