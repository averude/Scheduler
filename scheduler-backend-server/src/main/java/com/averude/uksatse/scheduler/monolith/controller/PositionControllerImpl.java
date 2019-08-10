package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.PositionController;
import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.PositionService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class PositionControllerImpl
        extends AbstractCrudController<Position> implements PositionController {

    private final PositionService positionService;

    @Autowired
    public PositionControllerImpl(PositionService positionService) {
        super(positionService, LoggerFactory.getLogger(PositionController.class));
        this.positionService = positionService;
    }

    @Override
    public Iterable<Position> getAll(Authentication authentication) {
        return positionService.findAllByAuth(authentication);
    }

    @Override
    public Iterable<Position> getAll() {
        return super.getAll();
    }

    @Override
    public Optional<Position> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
