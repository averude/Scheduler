package service;

import dao.EmployeeDAO;
import dao.ScheduleDAO;
import entity.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collection;

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
        if (parentId != schedule.getEmployeeId()){
            throw new IllegalArgumentException();
        }
        scheduleDAO.create(schedule);
    }

    @Override
    @Transactional
    public void updateById(long id, Schedule schedule) {
        schedule.setId(id);
        scheduleDAO.create(schedule);
    }

    @Override
    @Transactional
    public Collection<Schedule> getCurrentMonth(long employeeId) {
        LocalDate localDate = LocalDate.now();
        return scheduleDAO.getMonth(employeeId, localDate);
    }

    @Override
    @Transactional
    public Collection<Schedule> getByDate(long employeeId,
                                          LocalDate from,
                                          LocalDate to) {
        if (to == null) {
            to = LocalDate.now();
        }
        return scheduleDAO.getByDate(employeeId, from, to);
    }
}
