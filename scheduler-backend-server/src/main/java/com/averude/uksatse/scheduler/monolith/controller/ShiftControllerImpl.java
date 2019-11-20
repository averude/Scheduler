package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.ShiftController;
import com.averude.uksatse.scheduler.core.entity.Shift;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.ShiftService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ShiftControllerImpl
        extends AbstractCrudController<Shift> implements ShiftController {

    private final ShiftService shiftService;

    @Autowired
    public ShiftControllerImpl(ShiftService shiftService) {
        super(shiftService, LoggerFactory.getLogger(ShiftController.class));
        this.shiftService = shiftService;
    }

    @Override
    public List<Shift> getAllByDepartmentId(Long departmentId) {
        return shiftService.findAllByDepartmentId(departmentId);
    }

    @Override
    public Iterable<Shift> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<Shift> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
