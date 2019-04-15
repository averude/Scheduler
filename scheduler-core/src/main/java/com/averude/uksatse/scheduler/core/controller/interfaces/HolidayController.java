package com.averude.uksatse.scheduler.core.controller.interfaces;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/holidays")
public interface HolidayController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<Holiday> getAll(Authentication authentication);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> add(@Valid @RequestBody Holiday holiday);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{holidayId}")
    Optional<Holiday> get(@PathVariable Long holidayId);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody Holiday holiday);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{holidayId}")
    ResponseEntity<?> delete(@PathVariable Long holidayId);
}
