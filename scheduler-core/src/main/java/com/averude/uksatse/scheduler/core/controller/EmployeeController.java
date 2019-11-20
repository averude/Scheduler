package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.Employee;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EmployeeController extends BasicCrudController<Employee> {

    @RequestMapping(method = RequestMethod.GET,
                    value = "/admin/employees")
    Iterable<Employee> getAll();

    @RequestMapping(method = RequestMethod.GET,
                    value = "/admin/employees/departments/{departmentId}")
    List<Employee> getAllByDepartmentId(@PathVariable Long departmentId);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/admin/employees/shifts/{shiftId}/dates")
    List<Employee> getAllByShiftIdAndDateBetween(@PathVariable
                                                         Long shiftId,
                                                 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                 @RequestParam(value = "from")
                                                         LocalDate from,
                                                 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                 @RequestParam(value = "to")
                                                         LocalDate to);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees")
    Iterable<Employee> getAllInPosition(@PathVariable Long positionId);

    @RequestMapping(method = RequestMethod.GET,
            value = "/admin/employees/{id}")
    Optional<Employee> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST,
                    value = "/admin/employees")
    ResponseEntity<Long> post(@Valid @RequestBody Employee employee);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/admin/employees")
    ResponseEntity<?> put(@Valid @RequestBody Employee employee);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/admin/employees/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
