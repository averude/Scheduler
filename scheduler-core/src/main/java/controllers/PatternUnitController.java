package controllers;

import entity.PatternUnit;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RequestMapping("/api/v1/patterns/{patternId}/units")
public interface PatternUnitController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<PatternUnit> getAll(@RequestHeader("Department-ID") long departmentId,
                                 @PathVariable long patternId);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long patternId,
                             @RequestBody PatternUnit unit);

    @RequestMapping(method = RequestMethod.GET,
                    value = "{unitId}")
    Optional<PatternUnit> get(@RequestHeader("Department-ID") long departmentId,
                              @PathVariable long patternId,
                              @PathVariable long unitId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "{unitId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long patternId,
                             @PathVariable long unitId,
                             @RequestBody PatternUnit unit);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{unitId}")
    ResponseEntity<?> delete(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long patternId,
                             @PathVariable long unitId);
}
