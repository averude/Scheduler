package com.averude.uksatse.scheduler.core.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/patterns")
public interface ShiftPatternController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<ShiftPattern> getAll(@RequestHeader("Department-ID") Long departmentId);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(@RequestHeader("Department-ID") Long departmentId,
                             @Valid @RequestBody ShiftPattern shiftPattern);

    @RequestMapping(method = RequestMethod.GET,
                    value = "{patternId}")
    Optional<ShiftPattern> get(@RequestHeader("Department-ID") Long departmentId,
                               @PathVariable Long patternId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "{patternId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long patternId,
                             @Valid @RequestBody ShiftPattern shiftPattern);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{patternId}")
    ResponseEntity<?> delete(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long patternId);
}
