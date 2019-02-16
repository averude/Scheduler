package controllers;

import entity.Employee;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

public interface EmployeeController {
    @RequestMapping(method = RequestMethod.GET,
                    value = "/employees")
    Iterable<Employee> getAllInDepartment(@RequestHeader("Department-ID") Long departmentId);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees")
    Iterable<Employee> getAllInPosition(@RequestHeader("Department-ID") Long departmentId,
                                        @PathVariable Long positionId);

    @RequestMapping(method = RequestMethod.POST,
                    value = "/positions/{positionId}/employees")
    ResponseEntity<?> create(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long positionId,
                             @Valid @RequestBody Employee employee);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees/{employeeId}")
    Optional<Employee> get(@RequestHeader("Department-ID") Long departmentId,
                           @PathVariable Long positionId,
                           @PathVariable Long employeeId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/positions/{positionId}/employees/{employeeId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long positionId,
                             @PathVariable Long employeeId,
                             @Valid @RequestBody Employee employee);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/positions/{positionId}/employees/{employeeId}")
    ResponseEntity<?> delete(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long positionId,
                             @PathVariable Long employeeId);
}
