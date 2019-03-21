package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DepartmentServiceImpl
        extends AbstractService<Department, Long> implements DepartmentService {

    private final DepartmentRepository departmentRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    DepartmentServiceImpl(DepartmentRepository departmentRepository,
                          TokenExtraDetailsExtractor detailsExtractor){
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    public Optional<Department> getCurrent(Authentication authentication) {
        Long departmentId = (Long) detailsExtractor
                .extract(authentication)
                .get(TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return departmentRepository.findById(departmentId);
    }
}
