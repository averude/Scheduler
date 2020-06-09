package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.WorkingTimeController;
import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.security.modifier.entity.DepartmentIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.WorkingTimeService;
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
public class WorkingTimeControllerImpl
        extends AByAuthController<WorkingTime> implements WorkingTimeController {

    private final WorkingTimeService workingTimeService;

    @Autowired
    public WorkingTimeControllerImpl(WorkingTimeService workingTimeService,
                                     SimpleByAuthMethodResolver authStrategy,
                                     DepartmentIdEntityModifier<WorkingTime> entityModifier) {
        super(workingTimeService, authStrategy, entityModifier, LoggerFactory.getLogger(WorkingTimeController.class));
        this.workingTimeService = workingTimeService;
    }

    @Override
    public List<WorkingTime> getAllByAuth(Authentication authentication,
                                          @NonNull LocalDate from,
                                          @NonNull LocalDate to) {
        return super.getAllByAuth(authentication, from, to);
    }

    @Override
    public Optional<WorkingTime> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
