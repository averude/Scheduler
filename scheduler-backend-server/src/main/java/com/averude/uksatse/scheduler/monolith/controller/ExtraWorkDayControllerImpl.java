package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.ExtraWorkDayController;
import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.ExtraWorkDayService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class ExtraWorkDayControllerImpl
        extends AbstractCrudController<ExtraWorkDay> implements ExtraWorkDayController {

    private final ExtraWorkDayService extraWorkDayService;

    @Autowired
    public ExtraWorkDayControllerImpl(ExtraWorkDayService extraWorkDayService) {
        super(extraWorkDayService, LoggerFactory.getLogger(ExtraWorkDayController.class));
        this.extraWorkDayService = extraWorkDayService;
    }

    @Override
    public List<ExtraWorkDay> getAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                 LocalDate from,
                                                                 LocalDate to) {
        return extraWorkDayService.findAllByDepartmentId(departmentId, from, to);
    }

    @Override
    public List<ExtraWorkDay> getAllByShiftIdAndDateBetween(Long shiftId,
                                                            LocalDate from,
                                                            LocalDate to) {
        return extraWorkDayService.findAllByShiftId(shiftId, from, to);
    }

    @Override
    public Iterable<ExtraWorkDay> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<ExtraWorkDay> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
