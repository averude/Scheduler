package com.averude.uksatse.scheduler.controllers.interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public interface ICrudController<T> {
    Optional<T> get(Long id);

    ResponseEntity<Long> post(T entity, Authentication authentication);

    ResponseEntity<?> put(T entity, Authentication authentication);

    ResponseEntity<?> delete(Long id, Authentication authentication);
}
