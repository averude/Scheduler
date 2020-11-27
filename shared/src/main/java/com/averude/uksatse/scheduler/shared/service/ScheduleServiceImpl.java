package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.interfaces.entity.EntityComposition;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import com.averude.uksatse.scheduler.shared.repository.MainShiftCompositionRepository;
import com.averude.uksatse.scheduler.shared.repository.ScheduleRepository;
import com.averude.uksatse.scheduler.shared.repository.SubstitutionShiftCompositionRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class ScheduleServiceImpl
        extends AService<WorkDay, Long> implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final MainShiftCompositionRepository mainShiftCompositionRepository;
    private final SubstitutionShiftCompositionRepository substitutionShiftCompositionRepository;
    private final EmployeeRepository employeeRepository;

    @Autowired
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository,
                               MainShiftCompositionRepository mainShiftCompositionRepository,
                               SubstitutionShiftCompositionRepository substitutionShiftCompositionRepository,
                               EmployeeRepository employeeRepository) {
        super(scheduleRepository);
        this.scheduleRepository = scheduleRepository;
        this.mainShiftCompositionRepository = mainShiftCompositionRepository;
        this.substitutionShiftCompositionRepository = substitutionShiftCompositionRepository;
        this.employeeRepository = employeeRepository;
    }

    @Override
    @Transactional
    public List<BasicDto<Employee, WorkDay>> findAllDtoByDepartmentIdAndDate(Long departmentId,
                                                                             LocalDate from,
                                                                             LocalDate to) {
        return employeeRepository.findAllByDepartmentId(departmentId)
                .stream()
                .map(employee -> getEmployeeWorkDayBasicDto(employee, from, to))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<BasicDto<Employee, WorkDay>> findAllDtoByShiftIdAndDate(Long shiftId,
                                                                        LocalDate from,
                                                                        LocalDate to) {
        var mainCompositionsStream = mainShiftCompositionRepository.findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to).stream();
        var substitutionCompositionsStream = substitutionShiftCompositionRepository.findAllByShiftIdAndDatesBetween(shiftId, from, to).stream();

        return Stream.concat(mainCompositionsStream, substitutionCompositionsStream)
                .map(EntityComposition::getSideB)
                .distinct()
                .map(employee -> getEmployeeWorkDayBasicDto(employee, from, to))
                .collect(Collectors.toList());
    }

    private BasicDto<Employee, WorkDay> getEmployeeWorkDayBasicDto(Employee employee, LocalDate from, LocalDate to) {
        return new BasicDto<>(employee, scheduleRepository
                .findAllByDepartmentIdAndEmployeeIdAndDateBetweenOrderByDateAsc(employee.getDepartmentId(), employee.getId(), from, to));
    }
}
