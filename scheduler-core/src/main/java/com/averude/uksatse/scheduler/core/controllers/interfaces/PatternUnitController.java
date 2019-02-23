package com.averude.uksatse.scheduler.core.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/patterns/{patternId}/units")
public interface PatternUnitController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<PatternUnit> getAll(@RequestHeader("Department-ID") Long departmentId,
                                 @PathVariable Long patternId);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long patternId,
                             @Valid @RequestBody PatternUnit unit);

    @RequestMapping(method = RequestMethod.GET,
                    value = "{unitId}")
    Optional<PatternUnit> get(@RequestHeader("Department-ID") Long departmentId,
                              @PathVariable Long patternId,
                              @PathVariable Long unitId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "{unitId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long patternId,
                             @PathVariable Long unitId,
                             @Valid @RequestBody PatternUnit unit);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{unitId}")
    ResponseEntity<?> delete(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long patternId,
                             @PathVariable Long unitId);
}
