package com.averude.uksatse.scheduler.core.controller.interfaces;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

public interface PatternUnitController {
    @RequestMapping(method = RequestMethod.GET,
                    value = "/patterns/{patternId}/units")
    Iterable<PatternUnit> getAll(@PathVariable Long patternId);

    @RequestMapping(method = RequestMethod.POST,
                    value = "/units")
    ResponseEntity<?> create(@Valid @RequestBody PatternUnit unit);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/units/{unitId}")
    Optional<PatternUnit> get(@PathVariable Long unitId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/units")
    ResponseEntity<?> update(@Valid @RequestBody PatternUnit unit);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/units/{unitId}")
    ResponseEntity<?> delete(@PathVariable Long unitId);
}
