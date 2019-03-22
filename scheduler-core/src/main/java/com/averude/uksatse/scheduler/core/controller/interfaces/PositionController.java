package com.averude.uksatse.scheduler.core.controller.interfaces;

import com.averude.uksatse.scheduler.core.entity.Position;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/positions")
public interface PositionController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<Position> getAll(Authentication authentication);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(@Valid @RequestBody Position position);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{positionId}")
    Optional<Position> get(@PathVariable Long positionId);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(@Valid @RequestBody Position position);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{positionId}")
    ResponseEntity<?> delete(@PathVariable Long positionId);
}
