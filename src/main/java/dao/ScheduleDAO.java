package dao;

import entity.Schedule;

import java.time.LocalDate;
import java.util.Collection;

public interface ScheduleDAO extends GenericDAO<Schedule> {
    Collection<Schedule> getMonth(long employeeId, LocalDate date);
    Collection<Schedule> getByDate(long employeeId, LocalDate fromDate, LocalDate toDate);
}
