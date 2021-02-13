package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.security.annotations.IsAnyUser;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/shifts")
public interface ShiftController extends ICrudController<Shift>, IByAuthController<Shift> {

    @IsAnyUser
    @RequestMapping(method = RequestMethod.GET)
    List<Shift> getAllByAuth(Authentication authentication);

    @PreAuthorize("@userPermissionChecker.checkDepartmentUser(authentication, #departmentId)")
    @GetMapping("/departments/{departmentId}")
    List<Shift> getAllByDepartmentId(@PathVariable Long departmentId);

    @PreAuthorize("@userPermissionChecker.checkShiftUser(authentication, #shiftIds)")
    @GetMapping("/shifts/{shiftIds}")
    List<Shift> getAllByShiftIds(@PathVariable List<Long> shiftIds);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<Shift> get(@PathVariable Long id);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@RequestBody Shift entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@RequestBody Shift entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
