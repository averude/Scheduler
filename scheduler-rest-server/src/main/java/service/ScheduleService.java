package service;

import entity.WorkDay;
import validation.CheckDateParameters;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.Collection;

public interface ScheduleService extends GenericService<WorkDay> {
    Collection<WorkDay> getCurrentMonth(@Min(value = 1L, message = "{entity.id.size}")
                                         long employeeId);
    @CheckDateParameters
    Collection<WorkDay> getForEmployeeByDate(
            @Min(value = 1L, message = "{entity.id.size}")
            long employeeId,
            @NotNull(message = "{workDay.date.null}")
            LocalDate from,
            LocalDate to);

    // Methods for collections
    void createInParent(@Min(value = 1L, message = "{entity.id.size}")
                        final long parentId, Collection<WorkDay> schedule);
    void updateCollection(Collection<WorkDay> schedule);
}
