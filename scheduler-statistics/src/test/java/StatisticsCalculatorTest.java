import com.averude.uksatse.scheduler.core.dto.SummationResult;
import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.core.util.TimeCalculatorImpl;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import com.averude.uksatse.scheduler.generator.schedule.ScheduleGeneratorImpl;
import com.averude.uksatse.scheduler.statistics.calculator.StatisticsCalculatorImpl;
import org.junit.Test;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.function.BiFunction;

public class StatisticsCalculatorTest {
    private StatisticsCalculatorImpl statisticsCalculator = new StatisticsCalculatorImpl(new TimeCalculatorImpl());

    @Test
    public void test() {
        testMethod(statisticsCalculator::calcSum);
    }

    private void testMethod(BiFunction<List<SummationColumn>, List<WorkDay>, List<SummationResult>> function) {
        var bounds = getBounds();
        var times = new long[1000];
        long startTime = 0;
        long endTime = 0;
        System.out.println("Start measuring");
        var workDays = getWorkDays();
        for (int i = 0; i < times.length; i++) {
            startTime = System.nanoTime();
            var dtos = function.apply(bounds, workDays);
            endTime = System.nanoTime();
//            System.out.println(dtos);
            long time = endTime - startTime;
            times[i] = time;
        }
        System.out.print("Ending measuring. Calculating result: ");
        long sum = times[0];
        for (int i = 1; i < times.length; i++) {
            sum += times[i];
        }
        System.out.println(sum/(double)times.length);
    }

    private List<SummationColumn> getBounds() {
        var dt = new DayType(1L, 1L, new DayTypeGroup(null, "1", "", null), "", "", false, null, null, null, null);
        var dt2 = new DayType(2L, 1L, new DayTypeGroup(null, "2", "", null), "", "", false, null, null, null, null);

        var dtr1 = new SummationColumnDayTypeRange();
        dtr1.setDayTypeId(dt.getId());
        dtr1.setFrom(490);
        dtr1.setTo(500);

        var sc = new SummationColumn();
        sc.setName("");
        sc.setEnterpriseId(1L);
//        sc.setDayTypeRanges(Set.of(dtr1));

        return Arrays.asList(sc);
    }

    private List<WorkDay> getWorkDays() {
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
        secondUnit.setStartTime(workDayType.getStartTime());
        secondUnit.setEndTime(workDayType.getEndTime());
        secondUnit.setBreakStartTime(workDayType.getBreakStartTime());
        secondUnit.setBreakEndTime(workDayType.getBreakEndTime());

        var thirdUnit = new PatternUnit();
        thirdUnit.setDayTypeId(weekendDayType.getDayType().getId());

        var pattern = new ShiftPattern();
        pattern.setHolidayDepDayType(weekendDayType);
        pattern.setExtraWeekendDepDayType(weekendDayType);
        pattern.setExtraWorkDayDepDayType(workDayType);
        pattern.setSequence(Arrays.asList(firstUnit, secondUnit, thirdUnit));

        var extraWeekend = new ExtraWeekend();
        extraWeekend.setDate(LocalDate.parse("2020-01-05"));

        var extraWorkDay = new ExtraWorkDay();
        extraWorkDay.setDate(LocalDate.parse("2020-01-10"));

        var generator = new ScheduleGeneratorImpl();
        return generator.generate(interval, pattern,
                Collections.emptyList(), Collections.emptyList(),
                Arrays.asList(extraWeekend), Arrays.asList(extraWorkDay));
    }

    private List<WorkDay> getWorkDays(int size) {
        var random = ThreadLocalRandom.current();
        var workDays = new ArrayList<WorkDay>();
        for (int i = 0; i < size/2; i++) {
            workDays.add(new WorkDay(null,
                    null,
                    null,
                    500,
//                    random.nextInt(300, 600),
                    720,
                    750,
                    1040,
//                    random.nextInt(800, 1100),
                    null));
            workDays.add(new WorkDay(null,
                    null,
                    null,
                    499,
//                    random.nextInt(300, 600),
                    720,
                    750,
                    1040,
//                    random.nextInt(800, 1100),
                    null));
        }
        return workDays;
    }
}
