package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.ExtraWeekendController;
import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.ExtraWeekendService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class ExtraWeekendControllerImpl
        extends AbstractCrudController<ExtraWeekend> implements ExtraWeekendController {

    private final ExtraWeekendService extraWeekendService;

    @Autowired
    public ExtraWeekendControllerImpl(ExtraWeekendService extraWeekendService) {
        super(extraWeekendService, LoggerFactory.getLogger(ExtraWeekendController.class));
        this.extraWeekendService = extraWeekendService;
    }

    @Override
    public List<ExtraWeekend> getAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                 LocalDate from,
                                                                 LocalDate to) {
        return extraWeekendService.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    public List<ExtraWeekend> getAllByShiftIdAndDateBetween(Long shiftId,
                                                            LocalDate from,
                                                            LocalDate to) {
        return extraWeekendService.findAllByShiftIdAndDateBetween(shiftId, from, to);
    }

    @Override
    public Iterable<ExtraWeekend> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<ExtraWeekend> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
