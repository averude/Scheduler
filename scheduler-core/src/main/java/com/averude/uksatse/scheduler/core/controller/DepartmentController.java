package com.averude.uksatse.scheduler.core.controller;

import com.averude.uksatse.scheduler.core.entity.Department;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/admin/departments")
public interface DepartmentController extends BasicCrudController<Department> {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<Department> getAll();

    @RequestMapping(method = RequestMethod.GET, value = "/enterprises/{enterpriseId}")
    Iterable<Department> getAllByEnterpriseId(@PathVariable Long enterpriseId);

    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<Department> get(@PathVariable Long id);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@Valid @RequestBody Department entity);

    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@Valid @RequestBody Department entity);

    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id);
}
