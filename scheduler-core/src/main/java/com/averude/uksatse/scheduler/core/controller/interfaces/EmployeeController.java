package com.averude.uksatse.scheduler.core.controller.interfaces;

import com.averude.uksatse.scheduler.core.entity.Employee;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

public interface EmployeeController {
    @RequestMapping(method = RequestMethod.GET,
                    value = "/employees")
    Iterable<Employee> getAllInDepartment(Authentication authentication);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees")
    Iterable<Employee> getAllInPosition(@PathVariable Long positionId);

    @RequestMapping(method = RequestMethod.POST,
                    value = "/employees")
    ResponseEntity<?> create(@Valid @RequestBody Employee employee);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/employees/{employeeId}")
    Optional<Employee> get(@PathVariable Long employeeId);

    @RequestMapping(method = RequestMethod.GET,
            value = "/employees/current")
    Optional<Employee> get(Authentication authentication);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/employees")
    ResponseEntity<?> update(@Valid @RequestBody Employee employee);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/employees/{employeeId}")
    ResponseEntity<?> delete(@PathVariable Long employeeId);
}
