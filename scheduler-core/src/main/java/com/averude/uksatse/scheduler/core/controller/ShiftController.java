package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.Shift;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/admin/shifts")
public interface ShiftController extends BasicCrudController<Shift> {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<Shift> getAll(Authentication authentication);

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<Shift> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody Shift entity);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody Shift entity);

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
