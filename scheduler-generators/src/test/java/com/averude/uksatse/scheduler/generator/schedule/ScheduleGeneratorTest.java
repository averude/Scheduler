package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import org.junit.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.Assert.*;

public class ScheduleGeneratorTest {

    @Test
    public void generate() {
        var from = LocalDate.parse("2020-01-01");
        var to = LocalDate.parse("2020-01-31");
        var interval = new ScheduleGenerationInterval(from, to, 0L);

        var workDayType = new DayType();
        workDayType.setId(1L);
        workDayType.setLabel("WD");
        workDayType.setStartTime(480);
        workDayType.setEndTime(1005);
        workDayType.setBreakStartTime(600);
        workDayType.setBreakEndTime(660);

        var weekendDayType = new DayType();
        weekendDayType.setId(2L);
        weekendDayType.setLabel("WE");

        var firstUnit = new PatternUnit();
        firstUnit.setDayTypeId(workDayType.getId());
        firstUnit.setStartTime(workDayType.getStartTime());
        firstUnit.setEndTime(workDayType.getEndTime());
        firstUnit.setBreakStartTime(workDayType.getBreakStartTime());
        firstUnit.setBreakEndTime(workDayType.getBreakEndTime());

        var secondUnit = new PatternUnit();
        secondUnit.setDayTypeId(weekendDayType.getId());

        var pattern = new ShiftPattern();
        pattern.setHolidayDayType(weekendDayType);
        pattern.setHolidayDayTypeId(1L);
        pattern.setExtraWeekendDayType(weekendDayType);
        pattern.setExtraWeekendDayTypeId(2L);
        pattern.setExtraWorkDayDayType(workDayType);
        pattern.setExtraWorkDayDayTypeId(1L);
        pattern.setSequence(Arrays.asList(firstUnit, secondUnit));

        var extraWeekend = new ExtraWeekend();
        extraWeekend.setDate(LocalDate.parse("2020-01-05"));

        var extraWorkDay = new ExtraWorkDay();
        extraWorkDay.setDate(LocalDate.parse("2020-01-10"));

        var generator = new ScheduleGeneratorImpl();
        List<WorkDay> workDays = generator.generate(interval, pattern,
                Collections.emptyList(), Collections.emptyList(),
                Arrays.asList(extraWeekend), Arrays.asList(extraWorkDay));

        assertEquals(workDays.size(), 31);
        assertEquals(workDays.get(9).getDayTypeId().longValue(), 1L);
        assertEquals(workDays.get(4).getDayTypeId().longValue(), 2L);
    }
}
