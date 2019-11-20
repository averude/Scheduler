package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.ShiftCompositionController;
import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.ShiftCompositionService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class ShiftCompositionControllerImpl
        extends AbstractCrudController<ShiftComposition> implements ShiftCompositionController {

    private final ShiftCompositionService shiftCompositionService;

    @Autowired
    public ShiftCompositionControllerImpl(ShiftCompositionService shiftCompositionService) {
        super(shiftCompositionService, LoggerFactory.getLogger(ShiftCompositionController.class));
        this.shiftCompositionService = shiftCompositionService;
    }

    @Override
    public List<ShiftComposition> getAllByDepartmentId(Long departmentId,
                                                       LocalDate from,
                                                       LocalDate to) {
        return shiftCompositionService.findAllByDepartmentIdAndDate(departmentId, from, to);
    }

    @Override
    public List<ShiftComposition> getAllByShiftId(Long shiftId,
                                                  LocalDate from,
                                                  LocalDate to) {
        return shiftCompositionService.findAllByShiftIdAndDate(shiftId, from, to);
    }

    @Override
    public Iterable<ShiftComposition> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<ShiftComposition> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
