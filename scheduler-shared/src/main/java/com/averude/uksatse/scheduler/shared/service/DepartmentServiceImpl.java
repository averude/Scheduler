package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.core.extractor.DataByAuthorityExtractor;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DepartmentServiceImpl
        extends AbstractService<Department, Long> implements DepartmentService {

    private final DataByAuthorityExtractor extractor;

    @Autowired
    DepartmentServiceImpl(DepartmentRepository departmentRepository,
                          DataByAuthorityExtractor extractor){
        super(departmentRepository);
        this.extractor = extractor;
    }

    @Override
    public Optional<Department> getCurrent(Authentication authentication) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> findById(departmentId),
                (departmentId, shiftId) -> findById(departmentId));
    }
}
