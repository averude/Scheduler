package controller;

import entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.EmployeeService;

import java.util.Collection;

@RestController
@RequestMapping("/api/v1/departments/{departmentId}/positions/{positionId}/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<Employee> list(@PathVariable long positionId){
        return employeeService.getAll(positionId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> add(@PathVariable long positionId,
                                 @RequestBody Employee employee){
        employeeService.createInParent(positionId, employee);
        return ResponseEntity.ok("Employee with ID:" + employee.getId() +
                " was successfully created");
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{employeeId}")
    public Employee get(@PathVariable long employeeId){
        return employeeService.getById(employeeId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{employeeId}")
    public ResponseEntity<?> update(@PathVariable long employeeId,
                                    @RequestBody Employee employee){
        employeeService.updateById(employeeId, employee);
        return ResponseEntity.ok("Employee with ID:" + employeeId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{employeeId}")
    public ResponseEntity<?> delete(@PathVariable long employeeId){
        employeeService.deleteById(employeeId);
        return ResponseEntity.ok("Employee with ID:" + employeeId +
                " was successfully deleted");
    }
}
