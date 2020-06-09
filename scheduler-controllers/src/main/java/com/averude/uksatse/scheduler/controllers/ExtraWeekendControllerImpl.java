package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.ExtraWeekendController;
import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.security.modifier.entity.EnterpriseIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.ExtraWeekendService;
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
public class ExtraWeekendControllerImpl
        extends AByAuthController<ExtraWeekend> implements ExtraWeekendController {

    private final ExtraWeekendService extraWeekendService;

    @Autowired
    public ExtraWeekendControllerImpl(ExtraWeekendService extraWeekendService,
                                      SimpleByAuthMethodResolver authStrategy,
                                      EnterpriseIdEntityModifier<ExtraWeekend> entityModifier) {
        super(extraWeekendService, authStrategy, entityModifier, LoggerFactory.getLogger(ExtraWeekendController.class));
        this.extraWeekendService = extraWeekendService;
    }

    @Override
    public ExtraWorkDay transfer(LocalDate date, ExtraWeekend entity) {
        return extraWeekendService.transferWorkDay(entity, date);
    }

    @Override
    public List<ExtraWeekend> getAllByAuth(Authentication authentication,
                                           @NonNull LocalDate from,
                                           @NonNull LocalDate to) {
        return super.getAllByAuth(authentication, from, to);
    }

    @Override
    public Optional<ExtraWeekend> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(ExtraWeekend entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(ExtraWeekend entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
