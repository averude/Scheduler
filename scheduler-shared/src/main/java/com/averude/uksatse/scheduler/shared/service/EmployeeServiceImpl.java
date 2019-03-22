package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class EmployeeServiceImpl
        extends AbstractService<Employee, Long> implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                               TokenExtraDetailsExtractor detailsExtractor) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public Iterable<Employee> findAllByDepartmentId(long departmentId) {
        return this.employeeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<Employee> findAllByAuth(Authentication authentication) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return employeeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<Employee> findAllByPositionId(long positionId) {
        return this.employeeRepository.findAllByPositionId(positionId);
    }

    @Override
    @Transactional
    public Optional<Employee> getCurrent(Authentication authentication) {
        Long employeeId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.EMPLOYEE_ID);
        return employeeRepository.findById(employeeId);
    }
}
