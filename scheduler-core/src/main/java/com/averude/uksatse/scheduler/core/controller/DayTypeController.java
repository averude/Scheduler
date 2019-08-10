package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.DayType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/admin/daytypes")
public interface DayTypeController extends BasicCrudController<DayType> {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<DayType> getAll(Authentication authentication);

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<DayType> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody DayType entity);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody DayType entity);

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
