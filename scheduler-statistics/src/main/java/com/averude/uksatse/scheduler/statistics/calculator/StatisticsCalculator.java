package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.dto.SummationResult;
import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.core.entity.WorkDay;

import java.util.List;
import java.util.function.Function;

public interface StatisticsCalculator {
    List<SummationResult> calcSum(List<SummationColumn> summationColumns, List<WorkDay> workDays);

    default int getWorkDayLength(WorkDay workDay, SummationColumn summationColumn) {
        if (workDay.getStartTime() == null || workDay.getEndTime() == null) {
            return 0;
        }

        return summationColumn.getDayTypeRanges()
                .stream()
                .filter(range -> range.getDayTypeId().equals(workDay.getDayTypeId()))
                .findFirst()
                .map(getWorkDayLengthFunction(workDay))
                .orElse(0);
    }

    default Function<SummationColumnDayTypeRange, Integer> getWorkDayLengthFunction(WorkDay workDay) {
        return range -> {
            if (workDay.getBreakStartTime() != null && workDay.getBreakEndTime() != null) {
                int beforeBreak = getTimeLength(workDay.getStartTime(), workDay.getBreakStartTime(), range);
                int afterBreak = getTimeLength(workDay.getBreakEndTime(), workDay.getEndTime(), range);
                return beforeBreak + afterBreak;
            } else {
                return getTimeLength(workDay.getStartTime(), workDay.getEndTime(), range);
            }
        };
    }

    default int getTimeLength(int x, int y, SummationColumnDayTypeRange columnDayTypeRange) {
        return getTimeLength(x, y, columnDayTypeRange.getFrom(), columnDayTypeRange.getTo());
    }

    default int getTimeLength(Integer from, Integer to, Integer leftBound, Integer rightBound) {
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
