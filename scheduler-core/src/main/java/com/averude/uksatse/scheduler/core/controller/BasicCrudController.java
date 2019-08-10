package com.averude.uksatse.scheduler.core.controller;

import org.springframework.http.ResponseEntity;

import java.util.Optional;

public interface BasicCrudController<T> {

    Optional<T> get(Long id);

    ResponseEntity<Long> post(T entity);

    ResponseEntity<?> put(T entity);

    ResponseEntity<?> delete(Long id);
}
