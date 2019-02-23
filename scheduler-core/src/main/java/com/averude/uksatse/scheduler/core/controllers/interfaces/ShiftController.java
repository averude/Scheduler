package com.averude.uksatse.scheduler.core.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.Shift;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/shifts")
public interface ShiftController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<Shift> getAll(@RequestHeader("Department-ID") Long departmentId);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> create(@RequestHeader("Department-ID") Long departmentId,
                                @Valid @RequestBody Shift shift);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{shiftId}")
    Optional<Shift> get(@RequestHeader("Department-ID") Long departmentId,
                        @PathVariable Long shiftId);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{shiftId}")
    ResponseEntity<?> delete(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long shiftId);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(@RequestHeader("Department-ID") Long departmentId,
                             @Valid @RequestBody Shift shift);
}
