package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.model.dto.SummationResult;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.wrapper.WorkDayWrapper;
import com.averude.uksatse.scheduler.statistics.exceptions.NoCalculationStrategyFoundException;
import com.averude.uksatse.scheduler.statistics.strategy.CalculationStrategy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class StatisticsCalculatorImpl implements StatisticsCalculator {

    private Map<String, CalculationStrategy> calculationStrategies;

    private final CalendarDateColumnSummationStrategy noSpecialCalendarDateColumnSummationStrategy = new NoSpecialCalendarDateColumnSummationStrategy();
    private final CalendarDateColumnSummationStrategy defaultCalendarDateColumnSummationStrategy = new DefaultCalendarDateColumnSummationStrategy();

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

        if (summationColumn.getSpecialCalendarDateTypes() == null || summationColumn.getSpecialCalendarDateTypes().isEmpty()) {
            summationColumnSum = noSpecialCalendarDateColumnSummationStrategy.getSummationColumnSum(
                    summationColumn, countMap, calculationStrategy, dayTypeRanges);
        } else {
            summationColumnSum = defaultCalendarDateColumnSummationStrategy.getSummationColumnSum(
                    summationColumn, countMap, calculationStrategy, dayTypeRanges);
        }

        var summationResult = new SummationResult();
        summationResult.setSummationColumnId(summationColumn.getId());
        summationResult.setType(summationColumn.getColumnType());
        summationResult.setValue(summationColumnSum);
        return summationResult;
    }
}
