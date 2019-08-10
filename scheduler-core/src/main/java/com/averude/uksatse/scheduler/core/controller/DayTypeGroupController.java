package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.DayTypeGroup;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/admin/daytypegroups")
public interface DayTypeGroupController extends BasicCrudController<DayTypeGroup> {

    @RequestMapping(method = RequestMethod.GET)
    Iterable<DayTypeGroup> getAll();

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<DayTypeGroup> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody DayTypeGroup dayTypeGroup);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody DayTypeGroup dayTypeGroup);

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(Long id);
}
