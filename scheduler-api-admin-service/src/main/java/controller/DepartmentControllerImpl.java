package controller;

import controllers.DepartmentController;
import entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.DepartmentService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/departments")
public class DepartmentControllerImpl implements DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    DepartmentControllerImpl(DepartmentService departmentService) {
        this.departmentService = departmentService;
        Department d = new Department();
        d.setName("TEST");
        departmentService.save(d);
    }

    @Override
    @RequestMapping(method = RequestMethod.GET)
    public Iterable<Department> getAll(){
        return departmentService.findAll();
    }

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Long> add(@Valid @RequestBody Department department) {
        departmentService.save(department);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(department.getId()).toUri();
        return ResponseEntity.created(location).body(department.getId());
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/{departmentId}")
    public Optional<Department> get(@PathVariable long departmentId) {
        return departmentService.findById(departmentId);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{departmentId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @Valid @RequestBody Department department) {
        if (departmentId == department.getId()) {
            departmentService.save(department);
            return ResponseEntity.ok("Department with ID:" + departmentId +
                    " was successfully updated");
        } else {
            return ResponseEntity.unprocessableEntity()
                    .body("URI's ID doesn't match to Entity's ID");
        }
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{departmentId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId){
        departmentService.deleteById(departmentId);
        return new ResponseEntity<>("Department with ID:" + departmentId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
