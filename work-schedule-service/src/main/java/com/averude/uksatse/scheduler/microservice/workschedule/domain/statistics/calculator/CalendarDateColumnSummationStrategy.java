package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.calculator;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.strategy.CalculationStrategy;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.wrapper.WorkDayWrapper;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity.SummationColumn;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity.SummationColumnDayTypeRange;

import java.util.List;
import java.util.Map;

public interface CalendarDateColumnSummationStrategy {

    long getSummationColumnSum(SummationColumn summationColumn,
                               Map<WorkDayWrapper, Integer> countMap,
                               CalculationStrategy calculationStrategy,
                               List<SummationColumnDayTypeRange> dayTypeRanges);

}
