package service;

import entity.Schedule;

import java.time.LocalDate;
import java.util.Collection;

public interface ScheduleService extends GenericService<Schedule> {
    Collection<Schedule> getCurrentMonth(long employeeId);
    Collection<Schedule> getByDate(long employeeId, LocalDate from, LocalDate to);
}
