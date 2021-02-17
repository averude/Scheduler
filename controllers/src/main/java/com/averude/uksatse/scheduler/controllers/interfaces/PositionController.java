package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.entity.Position;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentOrShiftUser;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RequestMapping("/admin/positions")
public interface PositionController extends ICrudController<Position>, IByAuthController<Position> {

    @IsDepartmentOrShiftUser
    @RequestMapping(method = RequestMethod.GET)
    List<Position> getAllByAuth(Authentication authentication);

    @PreAuthorize("@userPermissionChecker.checkDepartmentUser(authentication, #departmentId)")
    @GetMapping("/departments/{departmentId}")
    List<Position> getAllByDepartmentId(@PathVariable Long departmentId);

    @PreAuthorize("@userPermissionChecker.checkShiftUser(authentication, #shiftIds)")
    @GetMapping("/shifts/{shiftIds}")
    List<Position> getAllByShiftIds(@PathVariable List<Long> shiftIds);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.GET, value = "/{id}")
    Optional<Position> get(@PathVariable Long id);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> post(@RequestBody Position entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> put(@RequestBody Position entity, Authentication authentication);

    @IsDepartmentAdmin
    @RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
    ResponseEntity<?> delete(@PathVariable Long id, Authentication authentication);
}
