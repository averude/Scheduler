package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class EmployeeServiceImpl
        extends AService<Employee, Long> implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
    }

    @Override
    @Transactional
    public List<Employee> findAllByDepartmentId(Long departmentId) {
        return this.employeeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<Employee> findAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        return employeeRepository.findEmployeesByShiftIdAndDatesBetween(shiftId, from, to);
    }

    @Override
    @Transactional
    public List<Employee> findAllByPositionId(Long positionId) {
        return this.employeeRepository.findAllByPositionIdOrderBySecondNameAscFirstNameAscPatronymicAsc(positionId);
    }
}
