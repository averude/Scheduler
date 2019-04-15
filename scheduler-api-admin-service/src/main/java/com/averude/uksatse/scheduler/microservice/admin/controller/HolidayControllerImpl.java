package com.averude.uksatse.scheduler.microservice.admin.controller;

import com.averude.uksatse.scheduler.core.controller.interfaces.HolidayController;
import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.shared.service.HolidayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/holidays")
public class HolidayControllerImpl implements HolidayController {

    private final HolidayService holidayService;

    @Autowired
    public HolidayControllerImpl(HolidayService holidayService) {
        this.holidayService = holidayService;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Holiday> getAll(Authentication authentication) {
        return holidayService.findAllByAuth(authentication);
    }

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> add(@Valid @RequestBody Holiday holiday) {
        holidayService.save(holiday);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(holiday.getId()).toUri();
        return ResponseEntity.created(location).body(holiday.getId());
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/{holidayId}")
    public Optional<Holiday> get(@PathVariable Long holidayId) {
        return holidayService.findById(holidayId);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> put(@Valid @RequestBody Holiday holiday) {
        holidayService.save(holiday);
        return ResponseEntity.ok("Holiday with ID:" + holiday.getId() +
                " was successfully updated");
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{holidayId}")
    public ResponseEntity<?> delete(@PathVariable Long holidayId) {
        holidayService.deleteById(holidayId);
        return ResponseEntity.ok("Holiday with ID:" + holidayId +
                " was successfully deleted");
    }
}
