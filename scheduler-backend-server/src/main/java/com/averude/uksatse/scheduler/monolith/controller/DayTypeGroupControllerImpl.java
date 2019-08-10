package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.DayTypeGroupController;
import com.averude.uksatse.scheduler.core.entity.DayTypeGroup;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.DayTypeGroupService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class DayTypeGroupControllerImpl
        extends AbstractCrudController<DayTypeGroup> implements DayTypeGroupController {

    private final DayTypeGroupService dayTypeGroupService;

    @Autowired
    public DayTypeGroupControllerImpl(DayTypeGroupService dayTypeGroupService) {
        super(dayTypeGroupService, LoggerFactory.getLogger(DayTypeGroupController.class));
        this.dayTypeGroupService = dayTypeGroupService;
    }

    @Override
    public Iterable<DayTypeGroup> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<DayTypeGroup> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
