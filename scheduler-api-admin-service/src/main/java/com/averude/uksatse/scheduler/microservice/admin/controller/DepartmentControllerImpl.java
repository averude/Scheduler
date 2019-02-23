package com.averude.uksatse.scheduler.microservice.admin.controller;

import com.averude.uksatse.scheduler.core.controllers.interfaces.DepartmentController;
import com.averude.uksatse.scheduler.core.entity.Department;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import com.averude.uksatse.scheduler.shared.service.DepartmentService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Optional;

@RestController
@RequestMapping("/departments")
public class DepartmentControllerImpl implements DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    DepartmentControllerImpl(DepartmentService departmentService) {
        this.departmentService = departmentService;
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
    public Optional<Department> get(@PathVariable Long departmentId) {
        return departmentService.findById(departmentId);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update(@Valid @RequestBody Department department) {
        departmentService.save(department);
        return ResponseEntity.ok("Department with ID:" + department.getId() +
                " was successfully updated");
    }

    @Override
    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{departmentId}")
    public ResponseEntity<?> delete(@PathVariable Long departmentId){
        departmentService.deleteById(departmentId);
        return new ResponseEntity<>("Department with ID:" + departmentId +
                " was successfully deleted", HttpStatus.NO_CONTENT);
    }
}
