package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;

@Service
public class DepartmentServiceImpl
        extends AbstractService<Department, Long> implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Autowired
    DepartmentServiceImpl(DepartmentRepository departmentRepository){
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
    }
}
