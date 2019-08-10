package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.validation.CheckDateParameters;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

public interface ScheduleService extends GenericService<WorkDay, Long> {
    @CheckDateParameters
    Iterable<WorkDay> getForEmployeeByDate(
            @Min(value = 1L, message = "{entity.id.size}")
                    long employeeId,
            @NotNull(message = "{workDay.date.null}")
                    LocalDate from,
            LocalDate to);

    void setHoliday(Long departmentId, LocalDate date);

    void removeHoliday(Long departmentId, LocalDate date);
}
