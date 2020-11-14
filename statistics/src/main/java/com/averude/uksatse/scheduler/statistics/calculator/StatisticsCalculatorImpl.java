package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.dto.SummationResult;
import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;
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
                                           List<SpecialCalendarDate> specialCalendarDates) {
        var set = getCountMap(workDays, specialCalendarDates).entrySet();
        return summationColumns.stream()
                .map(column -> new SummationResult(column.getId(), column.getColumnType(), calculateSum(set, column)))
                .collect(Collectors.toList());
    }

    private Map<WorkDayWrapper, Integer> getCountMap(List<WorkDay> workDays,
                                                     List<SpecialCalendarDate> specialCalendarDates) {
        Map<WorkDayWrapper, Integer> workDayCountMap = new HashMap<>();
        if (specialCalendarDates != null && !specialCalendarDates.isEmpty()) {
            for (int workDayIndex = 0, specialDateIndex = 0; workDayIndex < workDays.size(); workDayIndex++) {
                var workDay = workDays.get(workDayIndex);
                var wrapper = new WorkDayWrapper(workDay, null);

                if (specialDateIndex < specialCalendarDates.size()) {
                    var specialCalendarDate = specialCalendarDates.get(specialDateIndex);
                    if (specialCalendarDate != null && specialCalendarDate.getDate().equals(workDay.getDate())) {
                        wrapper.setSpecialDateType(specialCalendarDate.getDateType());
                        specialDateIndex++;
                    }
                }

                workDayCountMap.merge(wrapper, 1, Integer::sum);
            }
        } else {
            workDays.forEach(workDay -> workDayCountMap.merge(new WorkDayWrapper(workDay, null), 1, Integer::sum));
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

        if (column.getSpecialCalendarDateTypes() != null
                && !column.getSpecialCalendarDateTypes().isEmpty()) {
            entryStream = entryStream.filter(entry -> column.getSpecialCalendarDateTypes()
                    .contains(entry.getKey().getSpecialDateType()));
        }

        var calculationStrategy = calculationStrategies.get(column.getColumnType());
        if (calculationStrategy == null) throw new NoCalculationStrategyFoundException();

        return calculationStrategy.calculate(entryStream, column);
    }
}
