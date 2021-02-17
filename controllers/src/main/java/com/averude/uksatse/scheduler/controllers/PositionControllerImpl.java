package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.PositionController;
import com.averude.uksatse.scheduler.controllers.logging.Logged;
import com.averude.uksatse.scheduler.core.model.entity.Position;
import com.averude.uksatse.scheduler.security.modifier.entity.DepartmentIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.PositionService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class PositionControllerImpl
        extends AByAuthController<Position> implements PositionController {

    private final PositionService positionService;

    @Autowired
    public PositionControllerImpl(PositionService positionService,
                                  SimpleByAuthMethodResolver authStrategy,
                                  DepartmentIdEntityModifier<Position> entityModifier) {
        super(positionService, authStrategy, entityModifier, LoggerFactory.getLogger(PositionController.class));
        this.positionService = positionService;
    }

    @Override
    public List<Position> getAllByAuth(Authentication authentication) {
        return super.getAllByAuth(authentication);
    }

    @Logged
    @Override
    public List<Position> getAllByDepartmentId(Long departmentId) {
        return positionService.findAllByDepartmentId(departmentId);
    }

    @Logged
    @Override
    public List<Position> getAllByShiftIds(List<Long> shiftIds) {
        return positionService.findAllByShiftIds(shiftIds);
    }

    @Override
    public Optional<Position> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(Position entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(Position entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
