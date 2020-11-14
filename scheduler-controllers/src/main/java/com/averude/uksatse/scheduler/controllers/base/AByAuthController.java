package com.averude.uksatse.scheduler.controllers.base;

import com.averude.uksatse.scheduler.controllers.interfaces.IByAuthAndDateController;
import com.averude.uksatse.scheduler.controllers.interfaces.IByAuthController;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import com.averude.uksatse.scheduler.core.service.IService;
import com.averude.uksatse.scheduler.security.modifier.entity.EntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.IByAuthMethodResolver;
import lombok.NonNull;
import org.slf4j.Logger;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;
import java.util.List;

public abstract class AByAuthController<T extends HasId>
        extends ACrudController<T>
        implements IByAuthController<T>, IByAuthAndDateController<T> {

    private IService<T, Long> service;
    private IByAuthMethodResolver methodResolver;
    private EntityModifier<T> entityModifier;

    public AByAuthController(@NonNull IService<T, Long> service,
                             @NonNull IByAuthMethodResolver methodResolver,
                             Logger logger) {
        super(service, logger);
        this.service = service;
        this.methodResolver = methodResolver;
    }

    public AByAuthController(@NonNull IService<T, Long> service,
                             @NonNull IByAuthMethodResolver methodResolver,
                             EntityModifier<T> entityModifier,
                             Logger logger) {
        super(service, logger);
        this.service = service;
        this.methodResolver = methodResolver;
        this.entityModifier = entityModifier;
    }

    public List<T> getAllByAuth(@NonNull Authentication authentication) {
        logger.debug("User:{} - Getting all entities.", authentication.getPrincipal());
        return methodResolver.findAll(authentication, service, null, null);
    }

    public List<T> getAllByAuth(@NonNull Authentication authentication,
                                @NonNull LocalDate from,
                                @NonNull LocalDate to) {
        logger.debug("User:{} - Getting all entities from:{} to:{}.", authentication.getPrincipal(), from, to);
        return methodResolver.findAll(authentication, service, from, to);
    }

    @Override
    public ResponseEntity<Long> post(T entity, Authentication authentication) {
        if (entityModifier != null) entityModifier.modify(entity, authentication);
        logger.debug("User:{} - Posting entity:{}.", authentication.getPrincipal(), entity);
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(T entity, Authentication authentication) {
        if (entityModifier != null) entityModifier.modify(entity, authentication);
        logger.debug("User:{} - Putting entity:{}.", authentication.getPrincipal(), entity);
        return super.put(entity, authentication);
    }
}
