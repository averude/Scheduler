package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.dto.SummationResult;
import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.statistics.exceptions.NoCalculationStrategyFoundException;
import com.averude.uksatse.scheduler.statistics.strategy.CalculationStrategy;
import com.averude.uksatse.scheduler.statistics.wrapper.WorkDayWrapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class StatisticsCalculatorImpl implements StatisticsCalculator {

    private Map<String, CalculationStrategy> calculationStrategies;

    @Autowired
    public StatisticsCalculatorImpl(@Qualifier("calculationStrategies")
                                    Map<String, CalculationStrategy> calculationStrategies) {
        this.calculationStrategies = calculationStrategies;
    }

    @Override
    public List<SummationResult> calculate(List<SummationColumn> summationColumns,
                                           List<WorkDay> workDays,
                                           List<Holiday> holidays) {
        var set = getCountMap(workDays, holidays).entrySet();
        return summationColumns.stream()
                .map(column -> new SummationResult(column.getId(), column.getType(), calculateSum(set, column)))
                .collect(Collectors.toList());
    }

    private Map<WorkDayWrapper, Integer> getCountMap(List<WorkDay> workDays,
                                                     List<Holiday> holidays) {
        Map<WorkDayWrapper, Integer> workDayCountMap = new HashMap<>();
        if (holidays != null && !holidays.isEmpty()) {
            for (int workDayIndex = 0, holidayIndex = 0; workDayIndex < workDays.size(); workDayIndex++) {
                var workDay = workDays.get(workDayIndex);
                var wrapper = new WorkDayWrapper(workDay, false);

                if (holidayIndex < holidays.size()) {
                    var holiday = holidays.get(holidayIndex);
                    if (holiday != null && holiday.getDate().equals(workDay.getDate())) {
                        wrapper.setHoliday(true);
                        holidayIndex++;
                    }
                }

                workDayCountMap.merge(wrapper, 1, Integer::sum);
            }
        } else {
            workDays.forEach(workDay -> workDayCountMap.merge(new WorkDayWrapper(workDay, false), 1, Integer::sum));
        }
        return workDayCountMap;
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
            entryStream = entryStream.filter(entry -> entry.getKey().isHoliday());
        }

        CalculationStrategy calculationStrategy = calculationStrategies.get(column.getType());
        if (calculationStrategy == null) throw new NoCalculationStrategyFoundException();

        return calculationStrategy.calculate(entryStream, column);
    }
}
