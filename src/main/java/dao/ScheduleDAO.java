package dao;

import entity.Schedule;

import java.time.LocalDate;
import java.util.Collection;

public interface ScheduleDAO extends GenericDAO<Schedule> {
    Collection<Schedule> getMonth(long employeeId, LocalDate date);
    Collection<Schedule> getForEmployeeByDate(long employeeId, LocalDate from, LocalDate to);
    Collection<Schedule> getForDepartmentByDate(long departmentId, LocalDate from, LocalDate to);
}
