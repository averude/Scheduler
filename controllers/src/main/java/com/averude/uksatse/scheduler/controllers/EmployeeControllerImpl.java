package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.EmployeeController;
import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.security.modifier.entity.DepartmentIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.EmployeeService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Slf4j
@RestController
public class EmployeeControllerImpl
        extends AByAuthController<Employee> implements EmployeeController {

    private final EmployeeService employeeService;

    @Autowired
    public EmployeeControllerImpl(EmployeeService employeeService,
                                  SimpleByAuthMethodResolver methodResolver,
                                  DepartmentIdEntityModifier<Employee> entityModifier) {
        super(employeeService, methodResolver, entityModifier, log);
        this.employeeService = employeeService;
    }

    @Override
    public List<Employee> getAllByAuth(@NonNull Authentication authentication) {
        return super.getAllByAuth(authentication);
    }

    @Override
    public List<Employee> getAllByDepartmentId(Long departmentId) {
        return employeeService.findAllByDepartmentId(departmentId);
    }

    @Override
    public Optional<Employee> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
