import com.averude.uksatse.scheduler.core.dto.SummationResult;
import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.core.util.TimeCalculatorImpl;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import com.averude.uksatse.scheduler.generator.schedule.ScheduleGenerator;
import com.averude.uksatse.scheduler.generator.schedule.ScheduleGeneratorImpl;
import com.averude.uksatse.scheduler.statistics.calculator.StatisticsCalculator;
import com.averude.uksatse.scheduler.statistics.calculator.StatisticsCalculatorImpl;
import com.averude.uksatse.scheduler.statistics.config.StatisticsConfig;
import com.averude.uksatse.scheduler.statistics.strategy.WorkDaysCountCalculationStrategy;
import com.averude.uksatse.scheduler.statistics.strategy.WorkDaysHoursCalculationStrategy;
import com.averude.uksatse.scheduler.testing.*;
import org.junit.Test;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.EXTRA_WEEKEND;
import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.EXTRA_WORK_DAY;

public class StatisticsCalculatorTest {

    private DayTypeGenerator dayTypeGenerator = new DayTypeGenerator();
    private ShiftPatternGenerator shiftPatternGenerator = new ShiftPatternGenerator();
    private SpecialCalendarDateGenerator specialCalendarDateGenerator = new SpecialCalendarDateGenerator();
    private DepartmentDayTypeGenerator departmentDayTypeGenerator = new DepartmentDayTypeGenerator();
    private ScheduleGenerator scheduleGenerator = new ScheduleGeneratorImpl();
    private SummationColumnGenerator summationColumnGenerator = new SummationColumnGenerator();

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
        var dayTypes = dayTypeGenerator.generateList();
        var bounds = summationColumnGenerator.getSummationColumns(dayTypes);
        var times = new long[10];
        long startTime = 0;
        long endTime = 0;
        var workDays = getWorkDays(dayTypes);
        System.out.println("Start measuring");
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

    private List<WorkDay> getWorkDays(List<DayType> dayTypes) {
        var from = LocalDate.parse("2020-01-01");
        var to = LocalDate.parse("2020-12-31");
        var extraWeekendDate = "2020-01-05";
        var extraWorkDayDate = "2020-01-10";

        var interval = createInterval(from, to);

        var extraWeekend = specialCalendarDateGenerator.generate(extraWeekendDate, EXTRA_WEEKEND);
        var extraWorkDay = specialCalendarDateGenerator.generate(extraWorkDayDate, EXTRA_WORK_DAY);
        var departmentDayTypes = departmentDayTypeGenerator.generateList(dayTypes);
        var shiftPattern = shiftPatternGenerator.generateShiftPattern(departmentDayTypes);
        return scheduleGenerator.generate(interval, shiftPattern,
                Collections.emptyList(), Arrays.asList(extraWeekend, extraWorkDay));
    }

    private ScheduleGenerationInterval createInterval(LocalDate from, LocalDate to) {
        var employee = new Employee();
        employee.setId(1L);
        var scheduleGenerationInterval = new ScheduleGenerationInterval(from, to, 0L);
        scheduleGenerationInterval.setEmployee(employee);
        return scheduleGenerationInterval;
    }

    private interface TriFunction<T1, T2, T3, R> {
        R apply(T1 t1, T2 t2, T3 t3);
    }
}
