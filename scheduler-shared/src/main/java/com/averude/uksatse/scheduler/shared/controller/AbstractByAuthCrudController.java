package com.averude.uksatse.scheduler.shared.controller;

import com.averude.uksatse.scheduler.core.entity.HasId;
import com.averude.uksatse.scheduler.shared.service.GenericByAuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;

public abstract class AbstractByAuthCrudController<T extends HasId> extends AbstractCrudController<T> {
    private final GenericByAuthService<T, Long> genericByAuthService;

    public AbstractByAuthCrudController(GenericByAuthService<T, Long> genericByAuthService) {
        super(genericByAuthService, LoggerFactory.getLogger(AbstractByAuthCrudController.class));
        this.genericByAuthService = genericByAuthService;
    }

    public AbstractByAuthCrudController(GenericByAuthService<T, Long> genericByAuthService,
                                        Logger logger) {
        super(genericByAuthService, logger);
        this.genericByAuthService = genericByAuthService;
    }

    public Iterable<T> getAllByAuth(Authentication authentication) {
        if (logger.isDebugEnabled()) {
            logger.debug("Getting all entities by auth...");
        }
        return genericByAuthService.findAllByAuth(authentication);
    }
}
