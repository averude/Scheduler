package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.exception.DecodedDetailsMissingFieldException;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import static com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor.*;

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
    public List<Employee> findAllByAuth(Authentication authentication) {
        Map<String, Integer> decodedDetails = detailsExtractor.extractDecodedDetails(authentication);
        List<String> authoritiesList = detailsExtractor.getAuthoritiesList(authentication);

        if (authoritiesList.contains(GLOBAL_ADMIN)) {
            return findAll();
        } else if (authoritiesList.contains(DEPARTMENT_ADMIN)) {
            return findAllByDepartmentId(decodedDetails.get(DEPARTMENT_ID).longValue());
        } else if (authoritiesList.contains(SHIFT_ADMIN)) {
            return findAllByShiftId(decodedDetails.get(SHIFT_ID).longValue());
        } else {
            throw new DecodedDetailsMissingFieldException("No required authorities found");
        }
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
