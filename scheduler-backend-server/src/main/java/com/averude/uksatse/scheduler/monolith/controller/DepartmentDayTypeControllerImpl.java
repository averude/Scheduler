package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.DepartmentDayTypeController;
import com.averude.uksatse.scheduler.core.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.DepartmentDayTypeService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class DepartmentDayTypeControllerImpl
        extends AbstractCrudController<DepartmentDayType> implements DepartmentDayTypeController {

    private final DepartmentDayTypeService departmentDayTypeService;

    @Autowired
    public DepartmentDayTypeControllerImpl(DepartmentDayTypeService departmentDayTypeService) {
        super(departmentDayTypeService, LoggerFactory.getLogger(DepartmentDayTypeController.class));
        this.departmentDayTypeService = departmentDayTypeService;
    }

    @Override
    public List<DepartmentDayType> getAllByDepartmentId(Long departmentId) {
        return departmentDayTypeService.findAllByDepartmentId(departmentId);
    }

    @Override
    public List<DepartmentDayType> getAllByShiftId(Long shiftId) {
        return departmentDayTypeService.findAllByShiftId(shiftId);
    }

    @Override
    public Iterable<DepartmentDayType> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<DepartmentDayType> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
