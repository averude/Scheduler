package service;

import entity.Schedule;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collection;

public interface ScheduleService extends GenericService<Schedule> {
    Collection<Schedule> getCurrentMonth(@Min(value = 1L, message = "{entity.id.size}")
                                         long employeeId);
    Collection<Schedule> getByDate(@Min(value = 1L, message = "{entity.id.size}")
                                   long employeeId,
                                   @NotNull(message = "{schedule.date.null}")
                                   LocalDate from,
                                   LocalDate to);
}
