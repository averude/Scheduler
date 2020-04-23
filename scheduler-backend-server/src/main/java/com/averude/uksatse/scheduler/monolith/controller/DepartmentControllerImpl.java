package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.DepartmentController;
import com.averude.uksatse.scheduler.core.entity.Department;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.DepartmentService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class DepartmentControllerImpl
        extends AbstractCrudController<Department> implements DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentControllerImpl(DepartmentService departmentService) {
        super(departmentService, LoggerFactory.getLogger(DepartmentController.class));
        this.departmentService = departmentService;
    }

    @Override
    public Iterable<Department> getAll() {
        return super.getAll();
    }

    @Override
    public Iterable<Department> getAllByEnterpriseId(Long enterpriseId) {
        return departmentService.findAllByEnterpriseId(enterpriseId);
    }

    @Override
    public Optional<Department> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
