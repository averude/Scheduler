package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.DepartmentDayType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/department_day_types")
public interface DepartmentDayTypeController extends BasicCrudController<DepartmentDayType> {

    @RequestMapping(method = RequestMethod.GET,
            value = "/departments/{departmentId}")
    List<DepartmentDayType> getAllByDepartmentId(@PathVariable Long departmentId);

    @RequestMapping(method = RequestMethod.GET,
            value = "/shifts/{shiftId}")
    List<DepartmentDayType> getAllByShiftId(@PathVariable Long shiftId);

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<DepartmentDayType> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody DepartmentDayType entity);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody DepartmentDayType entity);

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
