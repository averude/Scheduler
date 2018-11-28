package service;

import dao.ScheduleDAO;
import entity.WorkDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Collection;

@Service
public class ScheduleServiceImpl
        extends AbstractService<WorkDay> implements ScheduleService {

    private final ScheduleDAO scheduleDAO;

    @Autowired
    public ScheduleServiceImpl(ScheduleDAO scheduleDAO) {
        super(scheduleDAO);
        this.scheduleDAO = scheduleDAO;
    }

    @Override
    @Transactional
    public Collection<WorkDay> findAllInParent(long parentId) {
        throw new UnsupportedOperationException();
    }

    @Override
    @Transactional
    public void createInParent(long parentId, WorkDay workDay) {
        if (parentId != workDay.getEmployeeId()){
            throw new IllegalArgumentException("URI id of employee doesn't " +
                    "match with employee id in WorkDay entity");
        }
        scheduleDAO.create(workDay);
    }

    @Override
    @Transactional
    public void createInParent(long parentId, Collection<WorkDay> schedule) {
        for (WorkDay workDay : schedule) {
            this.createInParent(parentId, workDay);
        }
    }

    @Override
    @Transactional
    public void updateById(long id, WorkDay workDay) {
        workDay.setId(id);
        scheduleDAO.update(workDay);
    }


    @Override
    @Transactional
    public void updateCollection(Collection<WorkDay> schedule) {
        for (WorkDay workDay : schedule) {
            if (workDay.getId() != null) {
                this.updateById(workDay.getId(), workDay);
            } else {
                throw new IllegalArgumentException("Cannot update " +
                        "workday without ID");
            }
        }
    }

    @Override
    @Transactional
    public Collection<WorkDay> getCurrentMonth(long employeeId) {
        LocalDate localDate = LocalDate.now();
        return scheduleDAO.getMonth(employeeId, localDate);
    }

    @Override
    @Transactional
    public Collection<WorkDay> getForEmployeeByDate(long employeeId,
                                                    LocalDate from,
                                                    LocalDate to) {
        if (to == null) {
            to = LocalDate.now();
        }
        return scheduleDAO.getForEmployeeByDate(employeeId, from, to);
    }
}
