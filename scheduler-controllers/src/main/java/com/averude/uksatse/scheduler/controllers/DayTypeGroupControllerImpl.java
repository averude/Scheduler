package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.ACrudController;
import com.averude.uksatse.scheduler.controllers.interfaces.DayTypeGroupController;
import com.averude.uksatse.scheduler.core.entity.DayTypeGroup;
import com.averude.uksatse.scheduler.shared.service.DayTypeGroupService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class DayTypeGroupControllerImpl
        extends ACrudController<DayTypeGroup> implements DayTypeGroupController {

    @Autowired
    public DayTypeGroupControllerImpl(DayTypeGroupService dayTypeGroupService) {
        super(dayTypeGroupService, LoggerFactory.getLogger(DayTypeGroupController.class));
    }

    @Override
    public List<DayTypeGroup> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<DayTypeGroup> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(DayTypeGroup entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(DayTypeGroup entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
