package com.averude.uksatse.scheduler.core.controllers.interfaces;

import com.averude.uksatse.scheduler.core.entity.Department;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/departments")
public interface DepartmentController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<Department> getAll();

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> add(@Valid @RequestBody Department department);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{departmentId}")
    Optional<Department> get(@PathVariable Long departmentId);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(@Valid @RequestBody Department department);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{departmentId}")
    ResponseEntity<?> delete(@PathVariable Long departmentId);
}
