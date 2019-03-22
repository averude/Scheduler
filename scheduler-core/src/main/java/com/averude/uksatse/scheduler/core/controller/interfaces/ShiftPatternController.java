package com.averude.uksatse.scheduler.core.controller.interfaces;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/patterns")
public interface ShiftPatternController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<ShiftPattern> getAll(Authentication authentication);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(@Valid @RequestBody ShiftPattern shiftPattern);

    @RequestMapping(method = RequestMethod.GET,
                    value = "{patternId}")
    Optional<ShiftPattern> get(@PathVariable Long patternId);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(@Valid @RequestBody ShiftPattern shiftPattern);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{patternId}")
    ResponseEntity<?> delete(@PathVariable Long patternId);
}
