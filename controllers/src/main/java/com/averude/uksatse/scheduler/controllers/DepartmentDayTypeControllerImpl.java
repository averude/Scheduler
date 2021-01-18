package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.DepartmentDayTypeController;
import com.averude.uksatse.scheduler.core.model.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.security.modifier.entity.DepartmentIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.DepartmentDayTypeService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class DepartmentDayTypeControllerImpl
        extends AByAuthController<DepartmentDayType> implements DepartmentDayTypeController {

    @Autowired
    public DepartmentDayTypeControllerImpl(DepartmentDayTypeService departmentDayTypeService,
                                           SimpleByAuthMethodResolver authStrategy,
                                           DepartmentIdEntityModifier<DepartmentDayType> entityModifier) {
        super(departmentDayTypeService, authStrategy, entityModifier, LoggerFactory.getLogger(DepartmentDayTypeController.class));
    }

    @Override
    public List<DepartmentDayType> getAllByAuth(Authentication authentication) {
        return super.getAllByAuth(authentication);
    }

    @Override
    public Optional<DepartmentDayType> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
