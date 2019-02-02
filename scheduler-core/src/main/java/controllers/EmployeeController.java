package controllers;

import entity.Employee;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/api/v1/")
public interface EmployeeController {
    @RequestMapping(method = RequestMethod.GET,
                    value = "/employees")
    Iterable<Employee> getAllInDepartment(@RequestHeader("Department-ID") long departmentId);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees")
    Iterable<Employee> getAllInPosition(@RequestHeader("Department-ID") long departmentId,
                                        @PathVariable long positionId);

    @RequestMapping(method = RequestMethod.POST,
                    value = "/positions/{positionId}/employees")
    ResponseEntity<?> create(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long positionId,
                             @Valid @RequestBody Employee employee);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees/{employeeId}")
    Optional<Employee> get(@RequestHeader("Department-ID") long departmentId,
                           @PathVariable long positionId,
                           @PathVariable long employeeId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/positions/{positionId}/employees/{employeeId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long positionId,
                             @PathVariable long employeeId,
                             @Valid @RequestBody Employee employee);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/positions/{positionId}/employees/{employeeId}")
    ResponseEntity<?> delete(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long positionId,
                             @PathVariable long employeeId);
}
