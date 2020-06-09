package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.DayTypeController;
import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.security.modifier.entity.EnterpriseIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.DayTypeService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class DayTypeControllerImpl
        extends AByAuthController<DayType> implements DayTypeController {
    @Autowired
    public DayTypeControllerImpl(DayTypeService dayTypeService,
                                 SimpleByAuthMethodResolver authStrategy,
                                 EnterpriseIdEntityModifier<DayType> entityModifier) {
        super(dayTypeService, authStrategy, entityModifier, LoggerFactory.getLogger(DayTypeController.class));
    }

    @Override
    public List<DayType> getAllByAuth(Authentication authentication) {
        return super.getAllByAuth(authentication);
    }

    @Override
    public Optional<DayType> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(DayType entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(DayType entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
