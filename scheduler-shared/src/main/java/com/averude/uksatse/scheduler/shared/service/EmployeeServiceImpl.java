package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.core.extractor.DataByAuthorityExtractor;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl
        extends AbstractService<Employee, Long> implements EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;
    private final DataByAuthorityExtractor extractor;

    @Autowired
    public EmployeeServiceImpl(EmployeeRepository employeeRepository,
                               TokenExtraDetailsExtractor detailsExtractor,
                               DataByAuthorityExtractor extractor) {
        super(employeeRepository);
        this.employeeRepository = employeeRepository;
        this.detailsExtractor = detailsExtractor;
        this.extractor = extractor;
    }

    @Override
    @Transactional
    public List<Employee> findAllByAuth(Authentication authentication) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> findAll(),
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId),
                (departmentId, shiftId) -> findAllByShiftId(shiftId));
    }

    @Override
    @Transactional
    public List<Employee> findAllByDepartmentId(long departmentId) {
        return this.employeeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<Employee> findAllByShiftId(long shiftId) {
        return employeeRepository
                .findAllByShiftIdOrderByShiftIdAscSecondNameAscFirstNameAscPatronymicAsc(shiftId);
    }

    @Override
    @Transactional
    public List<Employee> findAllByPositionId(long positionId) {
        return this.employeeRepository.findAllByPositionIdOrderByShiftIdAscSecondNameAscFirstNameAscPatronymicAsc(positionId);
    }

    @Override
    @Transactional
    public Optional<Employee> getCurrent(Authentication authentication) {
        Long employeeId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.EMPLOYEE_ID);
        return employeeRepository.findById(employeeId);
    }
}
