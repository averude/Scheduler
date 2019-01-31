package controller;

import entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.EmployeeService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/departments/{departmentId}")
public class EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/employees")
    public Iterable<Employee> getAllInDepartment(@PathVariable long departmentId) {
        return employeeService.findAllByDepartmentId(departmentId);
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees")
    public Iterable<Employee> getAllInPosition(@PathVariable long departmentId,
                                               @PathVariable long positionId){
        return employeeService.findAllByPositionId(positionId);
    }

    @RequestMapping(method = RequestMethod.POST,
                    value = "/positions/{positionId}/employees")
    public ResponseEntity<?> create(@PathVariable long departmentId,
                                    @PathVariable long positionId,
                                    @Valid @RequestBody Employee employee){
        if (positionId == employee.getPositionId()) {
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

    @RequestMapping(method = RequestMethod.GET,
                    value = "/positions/{positionId}/employees/{employeeId}")
    public Optional<Employee> get(@PathVariable long departmentId,
                                  @PathVariable long positionId,
                                  @PathVariable long employeeId){
        return employeeService.findById(employeeId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/positions/{positionId}/employees/{employeeId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @PathVariable long positionId,
                                    @PathVariable long employeeId,
                                    @Valid @RequestBody Employee employee){
        if (positionId != employee.getPositionId() && employeeId == employee.getId()) {
            employeeService.save(employee);
            return ResponseEntity.ok("Employee with ID:" + employeeId +
                    " was successfully updated");
        } else {
            return ResponseEntity.unprocessableEntity()
                    .body("URI's ID doesn't match to Entity's ID");
        }

    }

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/positions/{positionId}/employees/{employeeId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId,
                                    @PathVariable long positionId,
                                    @PathVariable long employeeId){
        employeeService.deleteById(employeeId);
        return ResponseEntity.ok("Employee with ID:" + employeeId +
                " was successfully deleted");
    }
}
