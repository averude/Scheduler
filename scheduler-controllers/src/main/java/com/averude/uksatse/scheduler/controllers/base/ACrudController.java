package com.averude.uksatse.scheduler.controllers.base;

import com.averude.uksatse.scheduler.controllers.interfaces.ICrudController;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasId;
import com.averude.uksatse.scheduler.core.service.IService;
import lombok.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

public abstract class ACrudController<T extends HasId> implements ICrudController<T> {
    protected final Logger logger;

    private final IService<T, Long> service;

    public ACrudController(@NonNull IService<T, Long> service) {
        this(service, LoggerFactory.getLogger(ACrudController.class));
    }

    public ACrudController(@NonNull IService<T, Long> service,
                           Logger logger) {
        this.service = service;
        this.logger = logger;
    }

    public List<T> getAll() {
        logger.trace("Getting all entities...");
        return service.findAll();
    }

    public Optional<T> get(Long id) {
        logger.trace("Getting entity by id: {}...", id);
        return service.findById(id);
    }

    public ResponseEntity<Long> post(T entity, Authentication authentication) {
        service.save(entity);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(entity.getId()).toUri();
        logger.info("Created entity: {}...", entity.toString());
        return ResponseEntity.created(location).body(entity.getId());
    }

    public ResponseEntity<?> put(T entity, Authentication authentication) {
        service.save(entity);
        logger.info("Updated entity: {}...", entity.toString());
        return ResponseEntity.ok("Entity with ID:" + entity.getId() +
                " was successfully updated");
    }

    public ResponseEntity<?> delete(Long id) {
        service.deleteById(id);
        logger.info("Removed entity with id: {}...", id);
        return new ResponseEntity<>("Entity with ID:" + id +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
