package controller;

import entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.EmployeeService;

import java.net.URI;
import java.util.Collection;

@RestController
@RequestMapping("/api/v1/departments/{departmentId}/positions/{positionId}/employees")
public class EmployeeController extends AbstractController<Employee>{

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        super(employeeService);
        this.employeeService = employeeService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<Employee> list(@PathVariable long departmentId,
                                     @PathVariable long positionId){
        return employeeService.getAll(positionId);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> add(@PathVariable long departmentId,
                                 @PathVariable long positionId,
                                 @RequestBody Employee employee){
        employeeService.createInParent(positionId, employee);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(employee.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{employeeId}")
    public Employee get(@PathVariable long departmentId,
                        @PathVariable long positionId,
                        @PathVariable long employeeId){
        this.validate(employeeId);
        return employeeService.getById(employeeId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{employeeId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @PathVariable long positionId,
                                    @PathVariable long employeeId,
                                    @RequestBody Employee employee){
        this.validate(employeeId);
        employeeService.updateById(employeeId, employee);
        return ResponseEntity.ok("Employee with ID:" + employeeId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{employeeId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId,
                                    @PathVariable long positionId,
                                    @PathVariable long employeeId){
        this.validate(employeeId);
        employeeService.deleteById(employeeId);
        return ResponseEntity.ok("Employee with ID:" + employeeId +
                " was successfully deleted");
    }
}
