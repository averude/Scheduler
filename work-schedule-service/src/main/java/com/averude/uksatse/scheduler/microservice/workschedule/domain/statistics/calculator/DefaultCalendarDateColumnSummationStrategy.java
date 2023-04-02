package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.calculator;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.strategy.CalculationStrategy;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.wrapper.WorkDayWrapper;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity.SummationColumn;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity.SummationColumnDayTypeRange;

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
