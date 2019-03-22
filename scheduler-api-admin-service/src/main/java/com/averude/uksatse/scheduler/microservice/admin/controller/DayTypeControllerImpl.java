package com.averude.uksatse.scheduler.microservice.admin.controller;

import com.averude.uksatse.scheduler.core.controller.interfaces.DayTypeController;
import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.shared.service.DayTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/daytypes")
public class DayTypeControllerImpl implements DayTypeController {

    private final DayTypeService dayTypeService;

    @Autowired
    public DayTypeControllerImpl(DayTypeService dayTypeService) {
        this.dayTypeService = dayTypeService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Iterable<DayType> getAll() {
        return dayTypeService.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Long> add(@Valid @RequestBody DayType dayType) {
        dayTypeService.save(dayType);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(dayType.getId()).toUri();
        return ResponseEntity.created(location).body(dayType.getId());
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{dayTypeId}")
    public Optional<DayType> get(@PathVariable Long dayTypeId) {
        return dayTypeService.findById(dayTypeId);
    }

    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> put(@Valid @RequestBody DayType dayType) {
        dayTypeService.save(dayType);
        return ResponseEntity.ok("Day type with ID:" + dayType.getId() +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{dayTypeId}")
    public ResponseEntity<?> delete(@PathVariable Long dayTypeId) {
        dayTypeService.deleteById(dayTypeId);
        return new ResponseEntity<>("Day type with ID:" + dayTypeId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
