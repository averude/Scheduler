package controller;

import entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.EmployeeService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collection;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/departments/{departmentId}")
public class EmployeeController extends AbstractController<Employee>{

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        super(employeeService);
        this.employeeService = employeeService;
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/employees")
    public Collection<Employee> getAllInDepartment(@PathVariable long departmentId) {
        return employeeService.findAllInDepartment(departmentId);
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees")
    public Collection<Employee> getAllInPosition(@PathVariable long departmentId,
                                                 @PathVariable long positionId){
        return employeeService.findAllInParent(positionId);
    }

    @RequestMapping(method = RequestMethod.POST,
                    value = "/positions/{positionId}/employees")
    public ResponseEntity<Long> create(@PathVariable long departmentId,
                                       @PathVariable long positionId,
                                       @Valid @RequestBody Employee employee){
        employeeService.createInParent(positionId, employee);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(employee.getId()).toUri();
        return ResponseEntity.created(location).body(employee.getId());
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees/{employeeId}")
    public Employee get(@PathVariable long departmentId,
                        @PathVariable long positionId,
                        @PathVariable long employeeId){
        this.validate(employeeId);
        return employeeService.getById(employeeId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/positions/{positionId}/employees/{employeeId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @PathVariable long positionId,
                                    @PathVariable long employeeId,
                                    @Valid @RequestBody Employee employee){
        this.validate(employeeId);
        employeeService.updateById(employeeId, employee);
        return ResponseEntity.ok("Employee with ID:" + employeeId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/positions/{positionId}/employees/{employeeId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId,
                                    @PathVariable long positionId,
                                    @PathVariable long employeeId){
        this.validate(employeeId);
        employeeService.deleteById(employeeId);
        return ResponseEntity.ok("Employee with ID:" + employeeId +
                " was successfully deleted");
    }
}
