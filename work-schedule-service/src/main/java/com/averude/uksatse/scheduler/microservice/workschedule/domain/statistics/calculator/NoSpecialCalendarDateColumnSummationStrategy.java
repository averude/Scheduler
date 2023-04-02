package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.calculator;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.strategy.CalculationStrategy;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.wrapper.WorkDayWrapper;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity.SummationColumn;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity.SummationColumnDayTypeRange;

import java.util.List;
import java.util.Map;

class NoSpecialCalendarDateColumnSummationStrategy implements CalendarDateColumnSummationStrategy {

    @Override
    public long getSummationColumnSum(SummationColumn summationColumn,
                                      Map<WorkDayWrapper, Integer> countMap,
                                      CalculationStrategy calculationStrategy,
                                      List<SummationColumnDayTypeRange> dayTypeRanges) {
        long summationColumnSum = 0;

        for (var entry : countMap.entrySet()) {
            var workDay = entry.getKey().getWorkDay();
            summationColumnSum += calculationStrategy.getSum(workDay, dayTypeRanges) * entry.getValue();
        }
        return summationColumnSum;
    }
}
