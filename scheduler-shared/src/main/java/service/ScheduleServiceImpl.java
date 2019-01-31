package service;

import entity.WorkDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.ScheduleRepository;

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
}
