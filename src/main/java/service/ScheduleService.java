package service;

import entity.Schedule;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collection;

@Validated
public interface ScheduleService extends GenericService<Schedule> {
    Collection<Schedule> getCurrentMonth(@Min(1L) long employeeId);
    Collection<Schedule> getByDate(@Min(1L) long employeeId,
                                   @NotNull LocalDate from, LocalDate to);
}
