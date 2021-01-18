package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.SpecialCalendarDateController;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.security.modifier.entity.EnterpriseIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.SpecialCalendarDateService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
public class SpecialCalendarDateControllerImpl
        extends AByAuthController<SpecialCalendarDate>
        implements SpecialCalendarDateController {

    @Autowired
    public SpecialCalendarDateControllerImpl(SpecialCalendarDateService service,
                                             SimpleByAuthMethodResolver methodResolver,
                                             EnterpriseIdEntityModifier<SpecialCalendarDate> entityModifier) {
        super(service, methodResolver, entityModifier, log);
    }

    @Override
    public List<SpecialCalendarDate> getAllByAuth(Authentication authentication,
                                                  @NonNull LocalDate from,
                                                  @NonNull LocalDate to) {
        return super.getAllByAuth(authentication, from, to);
    }

    @Override
    public Optional<SpecialCalendarDate> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(SpecialCalendarDate entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(SpecialCalendarDate entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
