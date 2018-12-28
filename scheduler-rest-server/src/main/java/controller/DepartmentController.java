package controller;

import entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.DepartmentService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collection;

@RestController
@RequestMapping("/api/v1/departments")
public class DepartmentController extends AbstractController<Department> {

    private final DepartmentService departmentService;

    @Autowired
    DepartmentController(DepartmentService departmentService) {
        super(departmentService);
        this.departmentService = departmentService;
        // for tests
        Department dep = new Department();
        dep.setName("Test department");
        this.departmentService.create(dep);
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<Department> getAll(){
        return departmentService.findAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Long> add(@Valid @RequestBody Department department) {
        departmentService.create(department);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(department.getId()).toUri();
        return ResponseEntity.created(location).body(department.getId());
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{departmentId}")
    public Department get(@PathVariable long departmentId) {
        this.validate(departmentId);
        return departmentService.getById(departmentId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{departmentId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @Valid @RequestBody Department department) {
        this.validate(departmentId);
        departmentService.updateById(departmentId, department);
        return ResponseEntity.ok("Department with ID:" + departmentId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{departmentId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId){
        this.validate(departmentId);
        departmentService.deleteById(departmentId);
        return new ResponseEntity<>("Department with ID:" + departmentId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
