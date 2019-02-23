package com.averude.uksatse.scheduler.core.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

public interface PatternUnitController {
    @RequestMapping(method = RequestMethod.GET,
                    value = "/patterns/{patternId}/units")
    Iterable<PatternUnit> getAll(@RequestHeader("Department-ID") Long departmentId,
                                 @PathVariable Long patternId);

    @RequestMapping(method = RequestMethod.POST,
                    value = "/units")
    ResponseEntity<?> create(@RequestHeader("Department-ID") Long departmentId,
                             @Valid @RequestBody PatternUnit unit);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/units/{unitId}")
    Optional<PatternUnit> get(@RequestHeader("Department-ID") Long departmentId,
                              @PathVariable Long unitId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/units/{unitId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long unitId,
                             @Valid @RequestBody PatternUnit unit);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/units/{unitId}")
    ResponseEntity<?> delete(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long unitId);
}
