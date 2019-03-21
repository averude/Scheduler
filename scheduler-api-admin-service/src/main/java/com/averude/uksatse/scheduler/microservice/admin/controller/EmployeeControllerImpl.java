package com.averude.uksatse.scheduler.microservice.admin.controller;

import com.averude.uksatse.scheduler.core.controller.interfaces.EmployeeController;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.shared.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
    public Iterable<Employee> getAllInDepartment(Authentication authentication) {
        return employeeService.findAllByAuth(authentication);
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees")
    public Iterable<Employee> getAllInPosition(@PathVariable Long positionId){
        return employeeService.findAllByPositionId(positionId);
    }

    @Override
    @RequestMapping(method = RequestMethod.POST,
                    value = "/employees")
    public ResponseEntity<?> create(@Valid @RequestBody Employee employee){
        employeeService.save(employee);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(employee.getId()).toUri();
        return ResponseEntity.created(location).body(employee.getId());
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/employees/{employeeId}")
    public Optional<Employee> get(@PathVariable Long employeeId){
        return employeeService.findById(employeeId);
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
            value = "/employees/current")
    public Optional<Employee> get(Authentication authentication){
        return employeeService.getCurrent(authentication);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT,
                    value = "/employees")
    public ResponseEntity<?> update(@Valid @RequestBody Employee employee){
        employeeService.save(employee);
        return ResponseEntity.ok("Employee with ID:" + employee.getId() +
                " was successfully updated");
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/employees/{employeeId}")
    public ResponseEntity<?> delete(@PathVariable Long employeeId){
        employeeService.deleteById(employeeId);
        return ResponseEntity.ok("Employee with ID:" + employeeId +
                " was successfully deleted");
    }
}
