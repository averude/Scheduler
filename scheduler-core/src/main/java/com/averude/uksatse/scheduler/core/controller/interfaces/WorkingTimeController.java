package com.averude.uksatse.scheduler.core.controller.interfaces;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/workingtime")
public interface WorkingTimeController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<WorkingTime> getAll(Authentication authentication);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> add(@Valid @RequestBody WorkingTime workingTime);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{workingTimeId}")
    Optional<WorkingTime> get(@PathVariable Long workingTimeId);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody WorkingTime workingTime);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{workingTimeId}")
    ResponseEntity<?> delete(@PathVariable Long workingTimeId);
}
