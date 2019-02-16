package com.averude.uksatse.scheduler.microservice.admin.controller;

import com.averude.uksatse.scheduler.core.controllers.interfaces.EmployeeController;
import com.averude.uksatse.scheduler.core.entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.averude.uksatse.scheduler.shared.service.EmployeeService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
public class EmployeeControllerImpl implements EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeControllerImpl(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/employees")
    public Iterable<Employee> getAllInDepartment(@RequestHeader("Department-ID") Long departmentId) {
        return employeeService.findAllByDepartmentId(departmentId);
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees")
    public Iterable<Employee> getAllInPosition(@RequestHeader("Department-ID") Long departmentId,
                                               @PathVariable Long positionId){
        return employeeService.findAllByPositionId(positionId);
    }

    @Override
    @RequestMapping(method = RequestMethod.POST,
                    value = "/positions/{positionId}/employees")
    public ResponseEntity<?> create(@RequestHeader("Department-ID") Long departmentId,
                                    @PathVariable Long positionId,
                                    @Valid @RequestBody Employee employee){
        if (positionId.equals(employee.getPositionId())) {
            employeeService.save(employee);
            URI location = ServletUriComponentsBuilder
                    .fromCurrentRequest().path("/{id}")
                    .buildAndExpand(employee.getId()).toUri();
            return ResponseEntity.created(location).body(employee.getId());
        } else {
            return ResponseEntity.unprocessableEntity()
                    .body("URI's ID doesn't match to Entity's ID");
        }

    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees/{employeeId}")
    public Optional<Employee> get(@RequestHeader("Department-ID") Long departmentId,
                                  @PathVariable Long positionId,
                                  @PathVariable Long employeeId){
        return employeeService.findById(employeeId);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT,
                    value = "/positions/{positionId}/employees/{employeeId}")
    public ResponseEntity<?> update(@RequestHeader("Department-ID") Long departmentId,
                                    @PathVariable Long positionId,
                                    @PathVariable Long employeeId,
                                    @Valid @RequestBody Employee employee){
        if (positionId.equals(employee.getPositionId()) && employeeId.equals(employee.getId())) {
            employeeService.save(employee);
            return ResponseEntity.ok("Employee with ID:" + employeeId +
                    " was successfully updated");
        } else {
            return ResponseEntity.unprocessableEntity()
                    .body("URI's ID doesn't match to Entity's ID");
        }

    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/positions/{positionId}/employees/{employeeId}")
    public ResponseEntity<?> delete(@RequestHeader("Department-ID") Long departmentId,
                                    @PathVariable Long positionId,
                                    @PathVariable Long employeeId){
        employeeService.deleteById(employeeId);
        return ResponseEntity.ok("Employee with ID:" + employeeId +
                " was successfully deleted");
    }
}
