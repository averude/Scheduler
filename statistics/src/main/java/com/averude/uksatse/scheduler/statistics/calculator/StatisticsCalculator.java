package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.model.dto.SummationResult;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.wrapper.WorkDayWrapper;

import java.util.List;
import java.util.Map;

public interface StatisticsCalculator {
    List<SummationResult> calculateByCountMap(Map<WorkDayWrapper, Integer> countMap,
                                              List<SummationColumn> summationColumns);
}
