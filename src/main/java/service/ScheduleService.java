package service;

import entity.Schedule;

import java.util.List;

public interface ScheduleService extends GenericService<Schedule> {
    List<Schedule> listMonth(long employeeId, int month, int year);
    Schedule getDay(long employeeId, int day, int month, int year);
}
