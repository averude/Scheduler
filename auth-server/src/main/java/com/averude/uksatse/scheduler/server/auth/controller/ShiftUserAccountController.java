package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseOrDepartmentAdmin;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/users/shift_admins")
public interface ShiftUserAccountController {

    @IsDepartmentAdmin
    @GetMapping
    List<UserAccountDTO> getAllByAuth(Authentication authentication);

    @IsEnterpriseOrDepartmentAdmin
    @GetMapping("/departments/{departmentId}")
    List<UserAccountDTO> getAllByDepartmentId(@PathVariable Long departmentId);

    @IsEnterpriseOrDepartmentAdmin
    @PostMapping
    UserAccountDTO create(@RequestBody NewUserAccountDTO accountDTO,
                          Authentication authentication);

    @IsEnterpriseOrDepartmentAdmin
    @PutMapping
    UserAccountDTO update(@RequestBody UserAccountDTO accountDTO,
                          Authentication authentication);

    @IsEnterpriseOrDepartmentAdmin
    @DeleteMapping("/{accountId}")
    void delete(@PathVariable Long accountId,
                Authentication authentication);

    @IsEnterpriseOrDepartmentAdmin
    @PutMapping("/{accountId}/password")
    void resetPassword(@PathVariable Long accountId,
                       @RequestBody PasswordResetDTO passwordResetDTO,
                       Authentication authentication);
}
