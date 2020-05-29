package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.structure.Department;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class DepartmentServiceImpl
        extends AService<Department, Long> implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Autowired
    DepartmentServiceImpl(DepartmentRepository departmentRepository){
        super(departmentRepository);
        this.departmentRepository = departmentRepository;
    }

    @Override
    @Transactional
    public List<Department> findAllByEnterpriseId(Long enterpriseId) {
        return departmentRepository.findAllByEnterpriseId(enterpriseId);
    }

    @Override
    @Transactional
    public Optional<Department> findByShiftIt(Long shiftId) {
        return departmentRepository.findByShiftId(shiftId);
    }
}
