package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.security.annotations.IsAnyUser;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/department_day_types")
public interface DepartmentDayTypeController
        extends ICrudController<DepartmentDayType>, IByAuthController<DepartmentDayType> {

    @IsAnyUser
    @RequestMapping(method = RequestMethod.GET)
    List<DepartmentDayType> getAllByAuth(Authentication authentication);

    @PreAuthorize("@userPermissionChecker.checkAnyUserOfDepartment(authentication, #departmentId)")
    @GetMapping("/departments/{departmentId}")
    List<DepartmentDayType> getAllByDepartmentId(@PathVariable Long departmentId);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<DepartmentDayType> get(@PathVariable Long id);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@RequestBody DepartmentDayType entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@RequestBody DepartmentDayType entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
