package service;

import dao.EmployeeDAO;
import dao.ScheduleDAO;
import entity.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collection;
import java.util.List;

@Service
public class ScheduleServiceImpl
        extends AbstractService<Schedule> implements ScheduleService {

    private final ScheduleDAO scheduleDAO;
    private final EmployeeDAO employeeDAO;

    @Autowired
    public ScheduleServiceImpl(ScheduleDAO scheduleDAO, EmployeeDAO employeeDAO) {
        super(scheduleDAO);
        this.scheduleDAO = scheduleDAO;
        this.employeeDAO = employeeDAO;
    }

    @Override
    @Transactional
    public Collection<Schedule> getAll(long parentId) {
        return employeeDAO.findById(parentId).getSchedule();
    }

    @Override
    @Transactional
    public void createInParent(long parentId, Schedule schedule) {
        employeeDAO.findById(parentId).addSchedule(schedule);
    }

    @Override
    @Transactional
    public void updateById(long id, Schedule schedule) {
        schedule.setId(id);
        scheduleDAO.create(schedule);
    }

    @Override
    @Transactional
    public List<Schedule> listMonth(long employeeId, int month, int year) {
        return scheduleDAO.listMonth(employeeId, month, year);
    }

    @Override
    @Transactional
    public Schedule getDay(long employeeId, int day, int month, int year) {
        return scheduleDAO.getDay(employeeId, day, month, year);
    }
}
