package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;

@Service
public class EmployeeServiceImpl
        extends AbstractService<Employee, Long> implements EmployeeService {

    private final EmployeeRepository employeeRepository;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
    }

    @Override
    @Transactional
    public Iterable<Employee> findAllByDepartmentId(long departmentId) {
        return this.employeeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<Employee> findAllByPositionId(long positionId) {
        return this.employeeRepository.findAllByPositionId(positionId);
    }
}
