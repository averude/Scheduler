package com.averude.uksatse.scheduler.microservice.admin.controller;

import com.averude.uksatse.scheduler.core.controllers.interfaces.ShiftPatternController;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.averude.uksatse.scheduler.shared.service.ShiftPatternService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/patterns")
public class ShiftPatternControllerImpl implements ShiftPatternController {

    private final ShiftPatternService shiftPatternService;

    @Autowired
    ShiftPatternControllerImpl(ShiftPatternService shiftPatternService) {
        this.shiftPatternService = shiftPatternService;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<ShiftPattern> getAll(@RequestHeader("Department-ID") Long departmentId) {
        return this.shiftPatternService.findAllByDepartmentId(departmentId);
    }

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> create(@RequestHeader("Department-ID") Long departmentId,
                                    @Valid @RequestBody ShiftPattern shiftPattern){
        shiftPattern.setDepartmentId(departmentId);
        this.shiftPatternService.save(shiftPattern);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(shiftPattern.getId()).toUri();
        return ResponseEntity.created(location).body(shiftPattern.getId());
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "{patternId}")
    public Optional<ShiftPattern> get(@RequestHeader("Department-ID") Long departmentId,
                                      @PathVariable Long patternId) {
        return this.shiftPatternService.findById(patternId);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update(@RequestHeader("Department-ID") Long departmentId,
                                    @Valid @RequestBody ShiftPattern shiftPattern) {
        this.shiftPatternService.save(shiftPattern);
        return ResponseEntity.ok("Shift pattern with ID:" + shiftPattern.getId() +
                " was successfully updated");
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "{patternId}")
    public ResponseEntity<?> delete(@RequestHeader("Department-ID") Long departmentId,
                                    @PathVariable Long patternId) {
        this.shiftPatternService.deleteById(patternId);
        return new ResponseEntity<>("Shift pattern with ID:" + patternId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
