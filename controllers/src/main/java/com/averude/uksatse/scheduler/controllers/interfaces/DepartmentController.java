package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.entity.structure.Department;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentOrShiftUser;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/departments")
public interface DepartmentController extends ICrudController<Department>, IByAuthController<Department> {
    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.GET)
    List<Department> getAllByAuth(Authentication authentication);

    // This structure of REST endpoints are temporary while migrating
    // from auth deciding strategy from backend to frontend
    @PreAuthorize("@userPermissionChecker.checkEnterpriseUser(authentication, #enterpriseId)")
    @GetMapping("/enterprises/{enterpriseId}")
    List<Department> getAllByEnterpriseId(@PathVariable Long enterpriseId);

    @IsDepartmentOrShiftUser
    @RequestMapping(method = RequestMethod.GET, value = "/current")
    Optional<Department> getCurrent(Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<Department> get(@PathVariable Long id);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@RequestBody Department entity, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@RequestBody Department entity, Authentication authentication);

    @IsEnterpriseAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
