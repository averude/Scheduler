package com.averude.uksatse.scheduler.controllers.impl;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.ShiftCompositionController;
import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.ShiftCompositionService;
import lombok.NonNull;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class ShiftCompositionControllerImpl
        extends AByAuthController<ShiftComposition> implements ShiftCompositionController {

    @Autowired
    public ShiftCompositionControllerImpl(ShiftCompositionService shiftCompositionService,
                                          SimpleByAuthMethodResolver authStrategy) {
        super(shiftCompositionService, authStrategy, LoggerFactory.getLogger(ShiftCompositionController.class));
    }

    @Override
    public List<ShiftComposition> getAllByAuth(Authentication authentication, @NonNull LocalDate from, @NonNull LocalDate to) {
        return super.getAllByAuth(authentication, from, to);
    }

    @Override
    public Optional<ShiftComposition> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(ShiftComposition entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(ShiftComposition entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
