package com.averude.uksatse.scheduler.microservice.admin.controller;

import com.averude.uksatse.scheduler.core.controller.interfaces.PatternUnitController;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.shared.service.PatternUnitService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
public class PatternUnitControllerImpl implements PatternUnitController {

    private final PatternUnitService patternUnitService;

    @Autowired
    PatternUnitControllerImpl(PatternUnitService patternUnitService) {
        this.patternUnitService = patternUnitService;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/patterns/{patternId}/units")
    public Iterable<PatternUnit> getAll(@PathVariable Long patternId) {
        return this.patternUnitService.findAllByPatternIdOrderByOrderId(patternId);
    }

    @Override
    @RequestMapping(method = RequestMethod.POST,
                    value = "/units")
    public ResponseEntity<?> create(@Valid @RequestBody PatternUnit unit) {
        this.patternUnitService.save(unit);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(unit.getId()).toUri();
        return ResponseEntity.created(location).body(unit.getId());
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/units/{unitId}")
    public Optional<PatternUnit> get(@PathVariable Long unitId) {
        return this.patternUnitService.findById(unitId);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT,
                    value = "/units")
    public ResponseEntity<?> update(@Valid @RequestBody PatternUnit unit) {
        this.patternUnitService.save(unit);
        return ResponseEntity.ok("Unit with ID:" + unit.getId() +
                " was successfully updated");
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/units/{unitId}")
    public ResponseEntity<?> delete(@PathVariable Long unitId) {
        this.patternUnitService.deleteById(unitId);
        return new ResponseEntity<>("Unit with ID:" + unitId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
