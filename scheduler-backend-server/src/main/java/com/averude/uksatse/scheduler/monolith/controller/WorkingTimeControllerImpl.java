package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.WorkingTimeController;
import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.WorkingTimeService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class WorkingTimeControllerImpl
        extends AbstractCrudController<WorkingTime> implements WorkingTimeController {

    private final WorkingTimeService workingTimeService;

    @Autowired
    public WorkingTimeControllerImpl(WorkingTimeService workingTimeService) {
        super(workingTimeService, LoggerFactory.getLogger(WorkingTimeController.class));
        this.workingTimeService = workingTimeService;
    }

    @Override
    public List<WorkingTime> getAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to) {
        return workingTimeService.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    public List<WorkingTime> getAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        return workingTimeService.findAllByShiftIdAndDateBetween(shiftId, from, to);
    }

    @Override
    public Iterable<WorkingTime> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<WorkingTime> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
