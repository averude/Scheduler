package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import org.junit.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;

import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.EXTRA_WEEKEND;
import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.EXTRA_WORK_DAY;
import static org.junit.Assert.assertEquals;

public class ScheduleGeneratorTest {

    @Test
    public void generate() {
        var from = LocalDate.parse("2020-01-01");
        var to = LocalDate.parse("2020-01-31");
        var interval = new ScheduleGenerationInterval(from, to, 0L);

        var firstDayType = new DayType();
        firstDayType.setId(1L);
        var secondDayType = new DayType();
        secondDayType.setId(2L);

        var workDayType = new DepartmentDayType();
        workDayType.setId(1L);
        workDayType.setDayType(firstDayType);
        workDayType.setStartTime(480);
        workDayType.setEndTime(1005);
        workDayType.setBreakStartTime(600);
        workDayType.setBreakEndTime(660);

        var weekendDayType = new DepartmentDayType();
        weekendDayType.setId(2L);
        weekendDayType.setDayType(secondDayType);

        var firstUnit = new PatternUnit();
        firstUnit.setDayTypeId(workDayType.getDayType().getId());
        firstUnit.setStartTime(workDayType.getStartTime());
        firstUnit.setEndTime(workDayType.getEndTime());
        firstUnit.setBreakStartTime(workDayType.getBreakStartTime());
        firstUnit.setBreakEndTime(workDayType.getBreakEndTime());

        var secondUnit = new PatternUnit();
        secondUnit.setDayTypeId(weekendDayType.getDayType().getId());

        var pattern = new ShiftPattern();
        pattern.setHolidayDepDayType(weekendDayType);
        pattern.setExtraWeekendDepDayType(weekendDayType);
        pattern.setExtraWorkDayDepDayType(workDayType);
        pattern.setSequence(Arrays.asList(firstUnit, secondUnit));

        var extraWeekend = new SpecialCalendarDate();
        extraWeekend.setDate(LocalDate.parse("2020-01-05"));
        extraWeekend.setDateType(EXTRA_WEEKEND);

        var extraWorkDay = new SpecialCalendarDate();
        extraWorkDay.setDate(LocalDate.parse("2020-01-10"));
        extraWorkDay.setDateType(EXTRA_WORK_DAY);

        var generator = new ScheduleGeneratorImpl();
        var workDays = generator.generate(interval, pattern,
                Collections.emptyList(), Arrays.asList(extraWeekend, extraWorkDay));

        assertEquals(workDays.size(), 31);
        assertEquals(workDays.get(9).getDayTypeId().longValue(), 1L);
        assertEquals(workDays.get(4).getDayTypeId().longValue(), 2L);
    }
}
