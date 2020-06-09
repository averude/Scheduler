package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.ACrudController;
import com.averude.uksatse.scheduler.controllers.interfaces.EmployeeController;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.util.UserAccountExtractor;
import com.averude.uksatse.scheduler.shared.service.EmployeeService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class EmployeeControllerImpl
        extends ACrudController<Employee> implements EmployeeController {

    private final EmployeeService employeeService;
    private final UserAccountExtractor accountExtractor;

    @Autowired
    public EmployeeControllerImpl(EmployeeService employeeService,
                                  UserAccountExtractor accountExtractor) {
        super(employeeService, LoggerFactory.getLogger(EmployeeController.class));
        this.employeeService = employeeService;
        this.accountExtractor = accountExtractor;
    }

    @Override
    public List<Employee> getAllByAuth(Authentication authentication) {
        var departmentId = accountExtractor.<DepartmentAdminUserAccount>extract(authentication).getDepartmentId();
        if (departmentId == null) throw new RuntimeException();

        return employeeService.findAllByDepartmentId(departmentId);
    }

    @Override
    public Optional<Employee> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(Employee entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(Employee entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
