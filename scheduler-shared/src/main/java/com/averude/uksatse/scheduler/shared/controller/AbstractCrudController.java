package com.averude.uksatse.scheduler.shared.controller;

import com.averude.uksatse.scheduler.core.controller.BasicCrudController;
import com.averude.uksatse.scheduler.core.entity.HasId;
import com.averude.uksatse.scheduler.shared.service.GenericService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Optional;

public abstract class AbstractCrudController<T extends HasId> implements BasicCrudController<T> {
    protected final Logger logger;

    private final GenericService<T, Long> genericService;

    public AbstractCrudController(GenericService<T, Long> genericService) {
        this.genericService = genericService;
        logger = LoggerFactory.getLogger(AbstractCrudController.class);
    }

    public AbstractCrudController(GenericService<T, Long> genericService, Logger logger) {
        this.genericService = genericService;
        this.logger = logger;
    }

    public Iterable<T> getAll() {
        logger.debug("Getting all entities...");
        return genericService.findAll();
    }

    public Optional<T> get(Long id) {
        logger.debug("Getting entity by id: {}...", id);
        return genericService.findById(id);
    }

    public ResponseEntity<Long> post(T entity) {
        genericService.save(entity);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(entity.getId()).toUri();
        logger.debug("Created entity with id: {}...", entity.getId());
        return ResponseEntity.created(location).body(entity.getId());
    }

    public ResponseEntity<?> put(T entity) {
        genericService.save(entity);
        logger.debug("Updated entity with id: {}...", entity.getId());
        return ResponseEntity.ok("Entity with ID:" + entity.getId() +
                " was successfully updated");
    }

    public ResponseEntity<?> delete(Long id) {
        genericService.deleteById(id);
        logger.debug("Removed entity with id: {}...", id);
        return new ResponseEntity<>("Entity with ID:" + id +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
