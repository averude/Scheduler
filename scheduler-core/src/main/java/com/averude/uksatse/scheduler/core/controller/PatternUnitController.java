package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

public interface PatternUnitController extends BasicCrudController<PatternUnit> {
    @RequestMapping(method = RequestMethod.GET,
                    value = "/admin/patterns/{id}/units")
    Iterable<PatternUnit> getAll(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST,
                    value = "/admin/units")
    ResponseEntity<Long> post(@Valid @RequestBody PatternUnit unit);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/admin/units/{id}")
    Optional<PatternUnit> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/admin/units")
    ResponseEntity<?> put(@Valid @RequestBody PatternUnit unit);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/admin/units/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
