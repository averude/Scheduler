package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.Position;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/admin/positions")
public interface PositionController extends BasicCrudController<Position> {

    @RequestMapping(method = RequestMethod.GET,
            value = "/departments/{departmentId}")
    Iterable<Position> getAllByDepartmentId(@PathVariable Long departmentId);

    @RequestMapping(method = RequestMethod.GET,
            value = "/shifts/{shiftId}")
    Iterable<Position> getAllByShiftId(@PathVariable Long shiftId);

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<Position> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody Position entity);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody Position entity);

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
