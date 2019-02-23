package com.averude.uksatse.scheduler.core.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.DayType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/daytypes")
public interface DayTypeController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<DayType> getAll();

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> add(@Valid @RequestBody DayType dayType);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{dayTypeId}")
    Optional<DayType> get(@PathVariable Long dayTypeId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{dayTypeId}")
    ResponseEntity<?> put(@PathVariable Long dayTypeId,
                          @Valid @RequestBody DayType dayType);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{dayTypeId}")
    ResponseEntity<?> delete(@PathVariable Long dayTypeId);
}
