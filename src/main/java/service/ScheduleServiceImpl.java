package service;

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

    @Autowired
    public ScheduleServiceImpl(ScheduleDAO scheduleDAO) {
        super(scheduleDAO);
        this.scheduleDAO = scheduleDAO;
    }

    @Override
    @Transactional
    public Collection<Schedule> findAllInParent(long parentId) {
        throw new UnsupportedOperationException();
    }

    @Override
    @Transactional
    public void createInParent(long parentId, Schedule schedule) {
        if (parentId != schedule.getEmployeeId()){
            throw new IllegalArgumentException("URI id of employee doesn't " +
                    "match with employee id in Schedule entity");
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
    public Collection<Schedule> getForEmployeeByDate(long employeeId,
                                                     LocalDate from,
                                                     LocalDate to) {
        if (to == null) {
            to = LocalDate.now();
        }
        return scheduleDAO.getForEmployeeByDate(employeeId, from, to);
    }

    @Override
    @Transactional
    public Collection<Schedule> getForDepartmentByDate(long departmentId,
                                                       LocalDate from,
                                                       LocalDate to) {
        if (to == null) {
            to = LocalDate.now();
        }
        return scheduleDAO.getForDepartmentByDate(departmentId, from, to);
    }
}
