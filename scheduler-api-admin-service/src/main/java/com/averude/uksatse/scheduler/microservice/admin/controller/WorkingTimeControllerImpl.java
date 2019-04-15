package com.averude.uksatse.scheduler.microservice.admin.controller;

import com.averude.uksatse.scheduler.core.controller.interfaces.WorkingTimeController;
import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.shared.service.WorkingTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/workingtime")
public class WorkingTimeControllerImpl implements WorkingTimeController {

    private final WorkingTimeService workingTimeService;

    @Autowired
    public WorkingTimeControllerImpl(WorkingTimeService workingTimeService) {
        this.workingTimeService = workingTimeService;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<WorkingTime> getAll(Authentication authentication) {
        return workingTimeService.findAllByAuth(authentication);
    }

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> add(@Valid @RequestBody WorkingTime workingTime) {
        workingTimeService.save(workingTime);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(workingTime.getId()).toUri();
        return ResponseEntity.created(location).body(workingTime.getId());
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/{workingTimeId}")
    public Optional<WorkingTime> get(@PathVariable  Long workingTimeId) {
        return workingTimeService.findById(workingTimeId);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> put(@Valid @RequestBody WorkingTime workingTime) {
        workingTimeService.save(workingTime);
        return ResponseEntity.ok("Working time with ID:" + workingTime.getId() +
                " was successfully updated");
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{workingTimeId}")
    public ResponseEntity<?> delete(@PathVariable Long workingTimeId) {
        workingTimeService.deleteById(workingTimeId);
        return ResponseEntity.ok("Working time with ID:" + workingTimeId +
                " was successfully deleted");
    }
}
