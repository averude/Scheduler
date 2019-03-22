package com.averude.uksatse.scheduler.microservice.admin.controller;

import com.averude.uksatse.scheduler.core.controller.interfaces.PositionController;
import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.shared.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/positions")
public class PositionControllerImpl implements PositionController {

    private final PositionService positionService;

    @Autowired
    public PositionControllerImpl(PositionService positionService) {
        this.positionService = positionService;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Position> getAll(Authentication authentication){
        return positionService.findAllByAuth(authentication);
    }

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> create(@Valid @RequestBody Position position){
        positionService.save(position);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(position.getId()).toUri();
        return ResponseEntity.created(location).body(position.getId());
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/{positionId}")
    public Optional<Position> get(@PathVariable Long positionId){
        return positionService.findById(positionId);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update(@Valid @RequestBody Position position){
        positionService.save(position);
        return ResponseEntity.ok("Position with ID:" + position.getId() +
                " was successfully updated");
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{positionId}")
    public ResponseEntity<?> delete(@PathVariable Long positionId){
        positionService.deleteById(positionId);
        return ResponseEntity.ok("Position with ID:" + positionId +
                " was successfully deleted");
    }
}
