package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.model.dto.SummationResult;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import com.averude.uksatse.scheduler.core.model.wrapper.WorkDayWrapper;
import com.averude.uksatse.scheduler.statistics.exceptions.NoCalculationStrategyFoundException;
import com.averude.uksatse.scheduler.statistics.strategy.CalculationStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;
import java.util.function.Predicate;
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
    public List<SummationResult> calculateByCountMap(Map<WorkDayWrapper, Integer> countMap,
                                                     List<SummationColumn> summationColumns) {
        return summationColumns.stream()
                .map(column -> calculateSummationColumn(column, countMap))
                .collect(Collectors.toList());
    }

    private SummationResult calculateSummationColumn(SummationColumn summationColumn,
                                                     Map<WorkDayWrapper, Integer> countMap) {
        var calculationStrategy = calculationStrategies.get(summationColumn.getColumnType());
        if (calculationStrategy == null) {
            throw new NoCalculationStrategyFoundException();
        }

        var dayTypeRanges = summationColumn.getDayTypeRanges();

        long summationColumnSum;

        BiFunction<WorkDay, SummationColumnDayTypeRange, Long> function =
                (workDay, range) -> range.getDayTypeId() - workDay.getDayTypeId();

        if (summationColumn.getSpecialCalendarDateTypes() == null || summationColumn.getSpecialCalendarDateTypes().isEmpty()) {
            summationColumnSum = getSummationColumnSum(countMap, calculationStrategy, dayTypeRanges, function);
        } else {
            Predicate<WorkDayWrapper> predicate =
                    workDayWrapper -> summationColumn.getSpecialCalendarDateTypes()
                            .contains(workDayWrapper.getSpecialDateType());
            summationColumnSum = getSummationColumnSum(countMap, calculationStrategy, dayTypeRanges, predicate, function);
        }


        var summationResult = new SummationResult();
        summationResult.setSummationColumnId(summationColumn.getId());
        summationResult.setType(summationColumn.getColumnType());
        summationResult.setValue(summationColumnSum);
        return summationResult;
    }

    private long getSummationColumnSum(Map<WorkDayWrapper, Integer> countMap,
                                       CalculationStrategy calculationStrategy,
                                       List<SummationColumnDayTypeRange> dayTypeRanges,
                                       BiFunction<WorkDay, SummationColumnDayTypeRange, Long> function) {
        long summationColumnSum = 0;

        for (var entry : countMap.entrySet()) {
            summationColumnSum += calculationStrategy
                    .getSum(entry.getKey().getWorkDay(), dayTypeRanges, function) * entry.getValue();
        }
        return summationColumnSum;
    }

    private long getSummationColumnSum(Map<WorkDayWrapper, Integer> countMap,
                                       CalculationStrategy calculationStrategy,
                                       List<SummationColumnDayTypeRange> dayTypeRanges,
                                       Predicate<WorkDayWrapper> calculationPredicate,
                                       BiFunction<WorkDay, SummationColumnDayTypeRange, Long> function) {
        long summationColumnSum = 0;

        for (var entry : countMap.entrySet()) {

            var wrapper = entry.getKey();
            if (calculationPredicate.test(wrapper)) {
                summationColumnSum += calculationStrategy
                        .getSum(wrapper.getWorkDay(), dayTypeRanges, function) * entry.getValue();
            }
        }
        return summationColumnSum;
    }
}
