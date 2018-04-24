package dao;

import entity.Schedule;

import java.util.List;

public interface ScheduleDAO extends GenericDAO<Schedule> {
    List<Schedule> listMonth(long employeeId, int month, int year);
    Schedule getDay(long employeeId, int day, int month, int year);
}
