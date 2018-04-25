package service;

import entity.Schedule;

import java.util.Collection;
import java.util.List;

public interface ScheduleService extends GenericService<Schedule> {
    Collection<Schedule> getCurrentMonth(long employeeId);
}
