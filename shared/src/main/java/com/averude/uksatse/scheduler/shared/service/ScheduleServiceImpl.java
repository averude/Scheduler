package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import com.averude.uksatse.scheduler.shared.repository.ScheduleRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import com.averude.uksatse.scheduler.shared.utils.ScheduleDTOUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
public class ScheduleServiceImpl
        extends AService<WorkDay, Long> implements ScheduleService {

    private final ScheduleRepository    scheduleRepository;
    private final EmployeeRepository    employeeRepository;
    private final ScheduleDTOUtil       scheduleDTOUtil;

    @Autowired
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository,
                               EmployeeRepository employeeRepository,
                               ScheduleDTOUtil scheduleDTOUtil) {
        super(scheduleRepository);
        this.scheduleRepository = scheduleRepository;
        this.employeeRepository = employeeRepository;
        this.scheduleDTOUtil = scheduleDTOUtil;
    }

    @Override
    @Transactional
    public List<BasicDto<Employee, WorkDay>> findAllDtoByDepartmentIdAndDate(Long departmentId,
                                                                             LocalDate from,
                                                                             LocalDate to) {
        var employees = employeeRepository.findAllByDepartmentIdOrderById(departmentId);
        var dtos = employees
                .stream()
                .map(employee -> new BasicDto<>(employee, new ArrayList<WorkDay>()))
                .collect(Collectors.toList());

        var schedule = scheduleRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
        scheduleDTOUtil.fillDTOs(dtos, schedule);

        return dtos;
    }

    @Override
    @Transactional
    public List<BasicDto<Employee, WorkDay>> findAllDtoByShiftIdAndDate(Long shiftId,
                                                                        LocalDate from,
                                                                        LocalDate to) {
        var mainCompositionsStream = employeeRepository.getAllEmployeesByMainShiftIdAndDateBetween(shiftId, from, to).stream();
        var substitutionCompositionsStream = employeeRepository.getAllEmployeesBySubstitutionShiftIdAndDateBetween(shiftId, from, to).stream();

        var dtos = Stream.concat(mainCompositionsStream, substitutionCompositionsStream)
                .sorted((a, b) -> (int) (b.getId() - a.getId()))
                .distinct()
                .map(employee -> new BasicDto<>(employee, new ArrayList<WorkDay>()))
                .collect(Collectors.toList());

        if (dtos.isEmpty()) {
            return dtos;
        }

        var departmentId = dtos.get(0).getParent().getDepartmentId();

        var ids = dtos.stream()
                .map(dto -> dto.getParent().getId())
                .collect(Collectors.toList());

        var schedule = scheduleRepository.findAllByEmployeeIdsAndDateBetween(departmentId, ids, from, to);
        scheduleDTOUtil.fillDTOs(dtos, schedule);

        return dtos;
    }
}
