package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentServiceImpl
        extends AbstractService<Department, Long> implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Autowired
    DepartmentServiceImpl(DepartmentRepository departmentRepository){
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
    }

    @Override
    public List<Department> findAllByEnterpriseId(Long enterpriseId) {
        return departmentRepository.findAllByEnterpriseId(enterpriseId);
    }
}
