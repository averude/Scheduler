package com.averude.uksatse.scheduler.controllers.impl;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.ExtraWorkDayController;
import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.security.modifier.entity.EnterpriseIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.ExtraWorkDayService;
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
public class ExtraWorkDayControllerImpl
        extends AByAuthController<ExtraWorkDay> implements ExtraWorkDayController {

    @Autowired
    public ExtraWorkDayControllerImpl(ExtraWorkDayService extraWorkDayService,
                                      SimpleByAuthMethodResolver authStrategy,
                                      EnterpriseIdEntityModifier<ExtraWorkDay> entityModifier) {
        super(extraWorkDayService, authStrategy, entityModifier, LoggerFactory.getLogger(ExtraWorkDayController.class));
    }

    @Override
    public List<ExtraWorkDay> getAllByAuth(Authentication authentication,
                                           @NonNull LocalDate from,
                                           @NonNull LocalDate to) {
        return super.getAllByAuth(authentication, from, to);
    }

    @Override
    public Optional<ExtraWorkDay> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(ExtraWorkDay entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(ExtraWorkDay entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
