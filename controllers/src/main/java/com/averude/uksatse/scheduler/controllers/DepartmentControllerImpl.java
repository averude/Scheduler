package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.DepartmentController;
import com.averude.uksatse.scheduler.core.model.entity.structure.Department;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.UserAccount;
import com.averude.uksatse.scheduler.security.modifier.entity.EnterpriseIdEntityModifier;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.DepartmentService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class DepartmentControllerImpl
        extends AByAuthController<Department> implements DepartmentController {

    private final DepartmentService departmentService;

    @Autowired
    public DepartmentControllerImpl(DepartmentService departmentService,
                                    SimpleByAuthMethodResolver authStrategy,
                                    EnterpriseIdEntityModifier<Department> entityModifier) {
        super(departmentService, authStrategy, entityModifier, LoggerFactory.getLogger(DepartmentController.class));
        this.departmentService = departmentService;
    }

    @Override
    public List<Department> getAllByAuth(Authentication authentication) {
        return super.getAllByAuth(authentication);
    }

    @Override
    public Optional<Department> getCurrent(Authentication authentication) {
        var userAccount = (UserAccount) authentication.getPrincipal();
        if (userAccount instanceof DepartmentAdminUserAccount) {
            var departmentId = ((DepartmentAdminUserAccount) userAccount).getDepartmentId();
            if (departmentId == null) throw new RuntimeException();

            return departmentService.findById(departmentId);
        } else if (userAccount instanceof ShiftAdminUserAccount) {
            var shiftId = ((ShiftAdminUserAccount) userAccount).getShiftId();
            if (shiftId == null) throw new RuntimeException();

            return departmentService.findByShiftIt(shiftId);
        } else throw new AccessDeniedException("");
    }

    @Override
    public Optional<Department> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(Department entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(Department entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
