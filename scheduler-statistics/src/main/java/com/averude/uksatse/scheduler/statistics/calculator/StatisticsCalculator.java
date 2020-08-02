package com.averude.uksatse.scheduler.statistics.calculator;

import com.averude.uksatse.scheduler.core.dto.SummationResult;
import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.entity.WorkDay;

import java.util.List;

public interface StatisticsCalculator {
    List<SummationResult> calculate(List<SummationColumn> summationColumns,
                                    List<WorkDay> workDays,
                                    List<Holiday> holidays);
}
