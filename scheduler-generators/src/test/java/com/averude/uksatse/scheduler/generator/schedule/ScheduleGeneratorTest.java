package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import com.averude.uksatse.scheduler.testing.DepartmentDayTypeGenerator;
import com.averude.uksatse.scheduler.testing.ShiftPatternGenerator;
import com.averude.uksatse.scheduler.testing.SpecialCalendarDateGenerator;
import org.junit.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;

import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.EXTRA_WEEKEND;
import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.EXTRA_WORK_DAY;
import static org.junit.Assert.assertEquals;

public class ScheduleGeneratorTest {

    private ShiftPatternGenerator shiftPatternGenerator = new ShiftPatternGenerator();
    private SpecialCalendarDateGenerator specialCalendarDateGenerator = new SpecialCalendarDateGenerator();
    private DepartmentDayTypeGenerator departmentDayTypeGenerator = new DepartmentDayTypeGenerator();
    private ScheduleGenerator scheduleGenerator = new ScheduleGeneratorImpl();

    @Test
    public void generate() {
        var from = LocalDate.parse("2020-01-01");
        var to = LocalDate.parse("2020-01-31");
        var extraWeekendDate = "2020-01-05";
        var extraWorkDayDate = "2020-01-10";

        var interval = createInterval(from, to);

        var extraWeekend = specialCalendarDateGenerator.generate(extraWeekendDate, EXTRA_WEEKEND);
        var extraWorkDay = specialCalendarDateGenerator.generate(extraWorkDayDate, EXTRA_WORK_DAY);
        var shiftPattern = shiftPatternGenerator.generateShiftPattern(departmentDayTypeGenerator.generateList());
        var workDays = scheduleGenerator.generate(interval, shiftPattern,
                Collections.emptyList(), Arrays.asList(extraWeekend, extraWorkDay));

        assertEquals(workDays.size(), 31);
        assertEquals(workDays.get(9).getScheduledDayTypeId(), shiftPattern.getExtraWorkDayDepDayType().getDayTypeId());
        assertEquals(workDays.get(4).getScheduledDayTypeId(), shiftPattern.getExtraWeekendDepDayType().getDayTypeId());
    }

    private ScheduleGenerationInterval createInterval(LocalDate from, LocalDate to) {
        var employee = new Employee();
        employee.setId(1L);
        var scheduleGenerationInterval = new ScheduleGenerationInterval(from, to, 0L);
        scheduleGenerationInterval.setEmployee(employee);
        return scheduleGenerationInterval;
    }
}
