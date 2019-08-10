package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.Employee;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

public interface EmployeeController extends BasicCrudController<Employee> {
    @RequestMapping(method = RequestMethod.GET,
                    value = "/admin/employees")
    Iterable<Employee> getAllInDepartment(Authentication authentication);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees")
    Iterable<Employee> getAllInPosition(@PathVariable Long positionId);

    @RequestMapping(method = RequestMethod.GET,
            value = "/admin/employees/current")
    Optional<Employee> get(Authentication authentication);

    @RequestMapping(method = RequestMethod.POST,
                    value = "/admin/employees")
    ResponseEntity<Long> post(@Valid @RequestBody Employee employee);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/admin/employees/{employeeId}")
    Optional<Employee> get(@PathVariable Long employeeId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/admin/employees")
    ResponseEntity<?> put(@Valid @RequestBody Employee employee);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/admin/employees/{employeeId}")
    ResponseEntity<?> delete(@PathVariable Long employeeId);
}
