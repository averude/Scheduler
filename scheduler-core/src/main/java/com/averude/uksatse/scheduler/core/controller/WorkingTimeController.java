package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.Optional;

@RequestMapping("/admin/workingtime")
public interface WorkingTimeController extends BasicCrudController<WorkingTime> {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<WorkingTime> getAll(Authentication authentication);

    @RequestMapping(method = RequestMethod.GET, value = "/search")
    Iterable<WorkingTime> getAllByYear(Authentication authentication,
                                       @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                       @RequestParam(value = "from")
                                               LocalDate from,
                                       @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                       @RequestParam(value = "to")
                                               LocalDate to);

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<WorkingTime> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody WorkingTime entity);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody WorkingTime entity);

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
