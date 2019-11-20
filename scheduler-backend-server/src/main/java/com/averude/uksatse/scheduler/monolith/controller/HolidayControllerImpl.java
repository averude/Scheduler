package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.HolidayController;
import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.HolidayService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Optional;

@RestController
public class HolidayControllerImpl
        extends AbstractCrudController<Holiday> implements HolidayController {

    private final HolidayService holidayService;

    @Autowired
    public HolidayControllerImpl(HolidayService holidayService) {
        super(holidayService, LoggerFactory.getLogger(HolidayController.class));
        this.holidayService = holidayService;
    }

    @Override
    public Iterable<Holiday> getAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to) {
        return holidayService.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    public Iterable<Holiday> getAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        return holidayService.findAllByShiftIdAndDateBetween(shiftId, from, to);
    }

    @Override
    public Iterable<Holiday> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<Holiday> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
