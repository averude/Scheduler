package controllers;

import entity.Department;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/api/v1/departments")
public interface DepartmentController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<Department> getAll();

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> add(@Valid @RequestBody Department department);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{departmentId}")
    Optional<Department> get(@PathVariable long departmentId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{departmentId}")
    ResponseEntity<?> update(@PathVariable long departmentId,
                             @Valid @RequestBody Department department);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{departmentId}")
    ResponseEntity<?> delete(@PathVariable long departmentId);
}
