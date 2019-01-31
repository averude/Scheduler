package service;

import entity.WorkDay;
import validation.CheckDateParameters;

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
}
