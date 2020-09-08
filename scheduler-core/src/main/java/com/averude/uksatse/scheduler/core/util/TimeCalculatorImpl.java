package com.averude.uksatse.scheduler.core.util;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasTime;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasTimeDuration;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class TimeCalculatorImpl implements TimeCalculator {

    @Override
    public float calculateHours(int offset,
                                List<? extends HasTime> hasTimeList,
                                LocalDate startOfMonth) {
        var endOfMonth = startOfMonth.plusDays(startOfMonth.lengthOfMonth() - 1);
        return calculateTime(offset, hasTimeList, startOfMonth, endOfMonth) / 60.0F;
    }

    private long calculateTime(int offset,
                               List<? extends HasTime> hasTimeList,
                               LocalDate from,
                               LocalDate to) {
        var daysInMonth     = from.until(to, ChronoUnit.DAYS) + 1;
        var periodSum       = getSum(hasTimeList);
        int hasTimeListSize = hasTimeList.size();

        var fullPeriods = daysInMonth / hasTimeListSize;
        var extraDays   = daysInMonth % hasTimeListSize;

        var result = periodSum * fullPeriods;
        for (int i = 0; i < extraDays; i++) {
            var unitIndex = (offset + i) % hasTimeListSize;
            result += getLength(hasTimeList.get(unitIndex), null);
        }
        return result;
    }

    private long getSum(List<? extends HasTime> hasTimeList) {
        return hasTimeList.stream()
                .mapToLong(unit -> getLength(unit, null))
                .sum();
    }

    @Override
    public Integer getLength(HasTime hasTime, HasTimeDuration hasTimeDuration) {
        if (hasTime == null || hasTime.getStartTime() == null || hasTime.getEndTime() == null) {
            return 0;
        }

        if (hasTime.getBreakStartTime() != null && hasTime.getBreakEndTime() != null) {
            int beforeBreak = getTimeLength(hasTime.getStartTime(), hasTime.getBreakStartTime(), hasTimeDuration);
            int afterBreak = getTimeLength(hasTime.getBreakEndTime(), hasTime.getEndTime(), hasTimeDuration);
            return beforeBreak + afterBreak;
        } else {
            return getTimeLength(hasTime.getStartTime(), hasTime.getEndTime(), hasTimeDuration);
        }
    }

    private int getTimeLength(int x, int y, HasTimeDuration hasTimeDuration) {
        if (hasTimeDuration == null) {
            return getTimeLength(x, y, null, null);
        } else {
            return getTimeLength(x, y, hasTimeDuration.getFrom(), hasTimeDuration.getTo());
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
