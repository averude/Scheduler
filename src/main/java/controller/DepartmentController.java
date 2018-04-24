package controller;

import entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.DepartmentService;

import java.util.Collection;

@RestController
@RequestMapping("/api/v1/departments")
public class DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public Collection<Department> getAll(){
        return departmentService.getAll();
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> add(@RequestBody Department department){
        departmentService.create(department);
        return ResponseEntity.ok("Department with ID:" + department.getId() +
                " was successfully created");
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{departmentId}")
    public Department get(@PathVariable long departmentId){
        return departmentService.getById(departmentId);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{departmentId}")
    public ResponseEntity<?> update(@PathVariable long departmentId,
                                    @RequestBody Department department){
        departmentService.updateById(departmentId, department);
        return ResponseEntity.ok("Department with ID:" + departmentId +
                " was successfully updated");
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/{departmentId}")
    public ResponseEntity<?> delete(@PathVariable long departmentId){
        departmentService.deleteById(departmentId);
        return ResponseEntity.ok("Department with ID:" + departmentId +
                " was successfully deleted");
    }

}
