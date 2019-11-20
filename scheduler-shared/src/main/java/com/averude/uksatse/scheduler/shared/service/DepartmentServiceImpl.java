package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentServiceImpl
        extends AbstractService<Department, Long> implements DepartmentService {

    @Autowired
    DepartmentServiceImpl(DepartmentRepository departmentRepository){
        super(departmentRepository);
    }
}
