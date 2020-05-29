package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@Deprecated
@RequestMapping("/admin/units")
public interface PatternUnitController extends ICrudController<PatternUnit> {
    @RequestMapping(method = RequestMethod.GET,
                    value = "/patterns/{id}")
    Iterable<PatternUnit> getAllByPatternId(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{id}")
    Optional<PatternUnit> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody PatternUnit unit, Authentication authentication);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody PatternUnit unit, Authentication authentication);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
