package service;

import entity.Schedule;
import validation.CheckDateParameters;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collection;

public interface ScheduleService extends GenericService<Schedule> {
    Collection<Schedule> getCurrentMonth(@Min(value = 1L, message = "{entity.id.size}")
                                         long employeeId);
    @CheckDateParameters
    Collection<Schedule> getForEmployeeByDate(
            @Min(value = 1L, message = "{entity.id.size}")
            long employeeId,
            @NotNull(message = "{schedule.date.null}")
            LocalDate from,
            LocalDate to);

    // Methods for collections
    void createInParent(@Min(value = 1L, message = "{entity.id.size}")
                        final long parentId, Collection<Schedule> schedule);
    void updateCollection(Collection<Schedule> schedule);
}
