package dao;

import entity.WorkDay;

import java.time.LocalDate;
import java.util.Collection;

public interface ScheduleDAO extends GenericDAO<WorkDay> {
    Collection<WorkDay> getMonth(long employeeId, LocalDate date);
    Collection<WorkDay> getForEmployeeByDate(long employeeId, LocalDate from, LocalDate to);
}
