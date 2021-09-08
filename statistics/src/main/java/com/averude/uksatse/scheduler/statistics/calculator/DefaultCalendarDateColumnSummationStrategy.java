package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.core.model.wrapper.WorkDayWrapper;
import com.averude.uksatse.scheduler.statistics.strategy.CalculationStrategy;

import java.util.List;
import java.util.Map;

class DefaultCalendarDateColumnSummationStrategy implements CalendarDateColumnSummationStrategy {

    @Override
    public long getSummationColumnSum(SummationColumn summationColumn,
                                      Map<WorkDayWrapper, Integer> countMap,
                                      CalculationStrategy calculationStrategy,
                                      List<SummationColumnDayTypeRange> dayTypeRanges) {
        long summationColumnSum = 0;

        for (var entry : countMap.entrySet()) {

            var wrapper = entry.getKey();
            if (summationColumn.getSpecialCalendarDateTypes()
                    .contains(wrapper.getSpecialDateType())) {
                var workDay = wrapper.getWorkDay();
                summationColumnSum += calculationStrategy.getSum(workDay, dayTypeRanges) * entry.getValue();
            }
        }
        return summationColumnSum;
    }
}
