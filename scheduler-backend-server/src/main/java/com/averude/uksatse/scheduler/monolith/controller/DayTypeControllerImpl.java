package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.DayTypeController;
import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.DayTypeService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class DayTypeControllerImpl
        extends AbstractCrudController<DayType> implements DayTypeController {

    private final DayTypeService dayTypeService;

    @Autowired
    public DayTypeControllerImpl(DayTypeService dayTypeService) {
        super(dayTypeService, LoggerFactory.getLogger(DayTypeController.class));
        this.dayTypeService = dayTypeService;
    }

    @Override
    public Iterable<DayType> getAll(Authentication authentication) {
        return dayTypeService.findAllByAuth(authentication);
    }

    @Override
    public Iterable<DayType> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<DayType> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
