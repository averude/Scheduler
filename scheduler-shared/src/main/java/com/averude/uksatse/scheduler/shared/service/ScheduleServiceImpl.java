package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import com.averude.uksatse.scheduler.shared.repository.ScheduleRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftCompositionRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImpl
        extends AService<WorkDay, Long> implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ShiftCompositionRepository shiftCompositionRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository,
                               ShiftCompositionRepository shiftCompositionRepository,
                               EmployeeRepository employeeRepository) {
        super(scheduleRepository);
        this.scheduleRepository = scheduleRepository;
        this.shiftCompositionRepository = shiftCompositionRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    @Transactional
    public List<BasicDto<Employee, WorkDay>> findAllDtoByDepartmentIdAndDate(Long departmentId,
                                                                             LocalDate from,
                                                                             LocalDate to) {
        return employeeRepository.findAllByDepartmentId(departmentId)
                .stream()
                .map(employee -> new BasicDto<>(employee,
                        scheduleRepository.findAllByEmployeeIdAndDateBetweenOrderByDateAsc(employee.getId(), from, to)))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<BasicDto<Employee, WorkDay>> findAllDtoByShiftIdAndDate(Long shiftId,
                                                                        LocalDate from,
                                                                        LocalDate to) {
        return shiftCompositionRepository.findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to)
                .stream()
                .map(shiftSchedule -> new BasicDto<>(
                        employeeRepository.findById(shiftSchedule.getEmployeeId()).orElseThrow(),
                        scheduleRepository.findAllByEmployeeIdAndDateBetweenOrderByDateAsc(shiftSchedule.getEmployeeId(), from, to)))
                .collect(Collectors.toList());
    }
}
