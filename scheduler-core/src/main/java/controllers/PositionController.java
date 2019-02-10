package controllers;

import entity.Position;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/positions")
public interface PositionController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<Position> getAll(@RequestHeader("Department-ID") long departmentId);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<?> create(@RequestHeader("Department-ID") long departmentId,
                             @Valid @RequestBody Position position);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{positionId}")
    Optional<Position> get(@RequestHeader("Department-ID") long departmentId,
                           @PathVariable long positionId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{positionId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long positionId,
                             @Valid @RequestBody Position position);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{positionId}")
    ResponseEntity<?> delete(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long positionId);
}
