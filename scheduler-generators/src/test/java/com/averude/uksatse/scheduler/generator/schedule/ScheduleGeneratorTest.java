package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import org.junit.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class ScheduleGeneratorTest {

    @Test
    public void generate() {
        var from = LocalDate.parse("2019-01-01");
        var to = LocalDate.parse("2019-02-01");
        var interval = new ScheduleGenerationInterval(from, to, 0L);

        var workDayType = new DayType();
        workDayType.setId(1L);
        workDayType.setLabel("WD");
        workDayType.setDefaultValue(4F);

        var weekendDayType = new DayType();
        weekendDayType.setId(2L);
        weekendDayType.setLabel("WE");
        weekendDayType.setDefaultValue(0F);

        var firstUnit = new PatternUnit();
        firstUnit.setDayTypeId(workDayType.getId());
        firstUnit.setValue(workDayType.getDefaultValue());

        var secondUnit = new PatternUnit();
        secondUnit.setDayTypeId(weekendDayType.getId());
        secondUnit.setValue(weekendDayType.getDefaultValue());

        var pattern = new ShiftPattern();
        pattern.setHolidayDayType(weekendDayType);
        pattern.setHolidayDayTypeId(1L);
        pattern.setExtraWeekendDayType(weekendDayType);
        pattern.setExtraWeekendDayTypeId(1L);
        pattern.setSequence(Arrays.asList(firstUnit, secondUnit));

        var extraWeekend = new ExtraWeekend();
        extraWeekend.setDate(LocalDate.parse("2019-01-03"));

        var generator = new ScheduleGeneratorImpl();
        List<WorkDay> workDays = generator.generate(interval, pattern, Collections.emptyList(), Collections.emptyList(), Arrays.asList(extraWeekend), Collections.emptyList());
        System.out.println(workDays);
    }
}
