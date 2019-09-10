package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;

public interface ScheduleController {
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Iterable<WorkDay>> create(@Valid @RequestBody Iterable<WorkDay> schedule);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(@Valid @RequestBody Iterable<WorkDay> schedule);
}
