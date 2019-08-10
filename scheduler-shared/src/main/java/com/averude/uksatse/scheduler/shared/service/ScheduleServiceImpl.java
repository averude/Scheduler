package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.shared.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class ScheduleServiceImpl
        extends AbstractService<WorkDay, Long> implements ScheduleService {

    private final ScheduleRepository scheduleRepository;

    @Autowired
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository) {
        super(scheduleRepository);
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    @Transactional
    public Iterable<WorkDay> getForEmployeeByDate(long employeeId,
                                                    LocalDate from,
                                                    LocalDate to) {
        if (to == null) {
            to = LocalDate.now();
        }
        return scheduleRepository.findAllByEmployeeIdAndDateBetween(employeeId, from, to);
    }

    @Override
    @Transactional
    public void setHoliday(Long departmentId, LocalDate date) {
        scheduleRepository.findAllByDepartmentIdAndDate(departmentId, date)
                .forEach(workDay -> workDay.setHoliday(true));
    }

    @Override
    @Transactional
    public void removeHoliday(Long departmentId, LocalDate date) {
        scheduleRepository.findAllByDepartmentIdAndDate(departmentId, date)
                .forEach(workDay -> workDay.setHoliday(false));
    }
}
