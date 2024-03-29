package com.averude.uksatse.scheduler.microservice.workschedule.domain.employee.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.employee.entity.Employee;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.EmployeeRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.service.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional(readOnly = true)
    public List<Employee> findAllByDepartmentId(Long departmentId) {
        return this.employeeRepository.findAllByDepartmentIdOrderById(departmentId);
    }
}
