import com.averude.uksatse.scheduler.core.dto.SummationResult;
import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.core.util.TimeCalculatorImpl;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import com.averude.uksatse.scheduler.generator.schedule.ScheduleGeneratorImpl;
import com.averude.uksatse.scheduler.statistics.calculator.StatisticsCalculator;
import com.averude.uksatse.scheduler.statistics.calculator.StatisticsCalculatorImpl;
import com.averude.uksatse.scheduler.statistics.config.StatisticsConfig;
import com.averude.uksatse.scheduler.statistics.strategy.WorkDaysCountCalculationStrategy;
import com.averude.uksatse.scheduler.statistics.strategy.WorkDaysHoursCalculationStrategy;
import org.junit.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import static com.averude.uksatse.scheduler.core.entity.SummationColumnType.COUNT;
import static com.averude.uksatse.scheduler.core.entity.SummationColumnType.HOURS_SUM;

public class StatisticsCalculatorTest {

    private static StatisticsCalculator getStatisticsCalculator() {
        StatisticsConfig config = new StatisticsConfig();
        WorkDaysHoursCalculationStrategy workDaysHoursCalculationStrategy = new WorkDaysHoursCalculationStrategy(new TimeCalculatorImpl());
        WorkDaysCountCalculationStrategy workDaysCountCalculationStrategy = new WorkDaysCountCalculationStrategy();
        return new StatisticsCalculatorImpl(config.calculationStrategies(Arrays.asList(workDaysHoursCalculationStrategy, workDaysCountCalculationStrategy)));
    }

    private StatisticsCalculator statisticsCalculator = getStatisticsCalculator();

    @Test
    public void test() {
        testMethod(statisticsCalculator::calculate);
    }

    private void testMethod(TriFunction<List<SummationColumn>, List<WorkDay>, List<SpecialCalendarDate>, List<SummationResult>> function) {
        var bounds = getBounds();
        var times = new long[1000];
        long startTime = 0;
        long endTime = 0;
        System.out.println("Start measuring");
        var workDays = getWorkDays();
        for (int i = 0; i < times.length; i++) {
            startTime = System.nanoTime();
            var dtos = function.apply(bounds, workDays,
                    Arrays.asList(new SpecialCalendarDate(null, 1L, LocalDate.parse("2020-01-01"), "Test", SpecialCalendarDateType.HOLIDAY)));
            endTime = System.nanoTime();
            long time = endTime - startTime;
            times[i] = time;
//            System.out.println(dtos);
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
        sc.setColumnType(HOURS_SUM);
        sc.setDayTypeRanges(Set.of(dtr1));

        var countSc = new SummationColumn();
        countSc.setName("Days count column");
        countSc.setEnterpriseId(1L);
        countSc.setColumnType(COUNT);
        countSc.setDayTypeRanges(Set.of(dtr1));

        return Arrays.asList(sc, countSc);
    }

    private List<WorkDay> getWorkDays() {
        var from = LocalDate.parse("2020-01-01");
        var to = LocalDate.parse("2020-12-31");
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

        var extraWeekend = new SpecialCalendarDate();
        extraWeekend.setDate(LocalDate.parse("2020-01-05"));
        extraWeekend.setDateType(SpecialCalendarDateType.EXTRA_WEEKEND);

        var extraWorkDay = new SpecialCalendarDate();
        extraWorkDay.setDate(LocalDate.parse("2020-01-10"));
        extraWorkDay.setDateType(SpecialCalendarDateType.EXTRA_WORK_DAY);

        var generator = new ScheduleGeneratorImpl();
        return generator.generate(interval, pattern,
                Collections.emptyList(), Arrays.asList(extraWorkDay, extraWeekend));
    }

    private interface TriFunction<T1, T2, T3, R> {
        R apply(T1 t1, T2 t2, T3 t3);
    }
}
