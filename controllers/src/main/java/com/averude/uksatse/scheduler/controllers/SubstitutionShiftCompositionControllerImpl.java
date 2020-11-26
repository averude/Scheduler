package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.SubstitutionShiftCompositionController;
import com.averude.uksatse.scheduler.core.entity.SubstitutionShiftComposition;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.SubstitutionShiftCompositionService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class SubstitutionShiftCompositionControllerImpl
        extends AByAuthController<SubstitutionShiftComposition>
        implements SubstitutionShiftCompositionController {

    @Autowired
    public SubstitutionShiftCompositionControllerImpl(SubstitutionShiftCompositionService substitutionShiftCompositionService,
                                                      SimpleByAuthMethodResolver authStrategy) {
        super(substitutionShiftCompositionService, authStrategy, LoggerFactory.getLogger(SubstitutionShiftCompositionController.class));
    }

    @Override
    public List<SubstitutionShiftComposition> getAllByAuth(Authentication authentication,
                                                           LocalDate from,
                                                           LocalDate to) {
        return super.getAllByAuth(authentication, from, to);
    }

    @Override
    public Optional<SubstitutionShiftComposition> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(SubstitutionShiftComposition entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(SubstitutionShiftComposition entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
