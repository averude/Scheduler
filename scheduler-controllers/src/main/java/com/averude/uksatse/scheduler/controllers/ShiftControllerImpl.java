package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.ShiftController;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.security.modifier.entity.DepartmentIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.ShiftService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ShiftControllerImpl
        extends AByAuthController<Shift> implements ShiftController {

    @Autowired
    public ShiftControllerImpl(ShiftService shiftService,
                               SimpleByAuthMethodResolver authStrategy,
                               DepartmentIdEntityModifier<Shift> entityModifier) {
        super(shiftService, authStrategy, entityModifier, LoggerFactory.getLogger(ShiftController.class));
    }

    @Override
    public List<Shift> getAllByAuth(Authentication authentication) {
        return super.getAllByAuth(authentication);
    }

    @Override
    public Optional<Shift> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(Shift entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(Shift entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
