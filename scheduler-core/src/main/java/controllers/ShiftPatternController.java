package controllers;

import entity.ShiftPattern;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/api/v1/patterns")
public interface ShiftPatternController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<ShiftPattern> getAll(@RequestHeader("Department-ID") long departmentId);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(@RequestHeader("Department-ID") long departmentId,
                             @Valid @RequestBody ShiftPattern shiftPattern);

    @RequestMapping(method = RequestMethod.GET,
                    value = "{patternId}")
    Optional<ShiftPattern> get(@RequestHeader("Department-ID") long departmentId,
                               @PathVariable long patternId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "{patternId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long patternId,
                             @Valid @RequestBody ShiftPattern shiftPattern);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{patternId}")
    ResponseEntity<?> delete(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long patternId);
}
