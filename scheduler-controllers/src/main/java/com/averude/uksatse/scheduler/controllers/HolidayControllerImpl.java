package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.HolidayController;
import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.security.modifier.entity.EnterpriseIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.HolidayService;
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
public class HolidayControllerImpl
        extends AByAuthController<Holiday> implements HolidayController {

    @Autowired
    public HolidayControllerImpl(HolidayService holidayService,
                                 SimpleByAuthMethodResolver authStrategy,
                                 EnterpriseIdEntityModifier<Holiday> entityModifier) {
        super(holidayService, authStrategy, entityModifier, LoggerFactory.getLogger(HolidayController.class));
    }

    @Override
    public List<Holiday> getAllByAuth(Authentication authentication,
                                      @NonNull LocalDate from,
                                      @NonNull LocalDate to) {
        return super.getAllByAuth(authentication, from, to);
    }

    @Override
    public Optional<Holiday> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(Holiday entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(Holiday entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
