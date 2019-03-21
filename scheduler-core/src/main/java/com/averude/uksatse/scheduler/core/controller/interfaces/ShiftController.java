package com.averude.uksatse.scheduler.core.controller.interfaces;

import com.averude.uksatse.scheduler.core.entity.Shift;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/shifts")
public interface ShiftController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<Shift> getAll(Authentication authentication);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> create(@Valid @RequestBody Shift shift);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{shiftId}")
    Optional<Shift> get(@PathVariable Long shiftId);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{shiftId}")
    ResponseEntity<?> delete(@PathVariable Long shiftId);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(@Valid @RequestBody Shift shift);
}
