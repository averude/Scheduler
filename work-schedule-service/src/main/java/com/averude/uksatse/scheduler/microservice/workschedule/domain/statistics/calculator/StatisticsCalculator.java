package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.calculator;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.dto.SummationResult;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.wrapper.WorkDayWrapper;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.summationcolumn.entity.SummationColumn;

import java.util.List;
import java.util.Map;

public interface StatisticsCalculator {
    List<SummationResult> calculateByCountMap(Map<WorkDayWrapper, Integer> countMap,
                                              List<SummationColumn> summationColumns);
}
