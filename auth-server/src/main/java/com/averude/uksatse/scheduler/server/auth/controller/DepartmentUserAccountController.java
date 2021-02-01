package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/users/department_admins")
public interface DepartmentUserAccountController {

    @IsEnterpriseAdmin
    @GetMapping
    List<UserAccountDTO> getAllByAuth(Authentication authentication);

    @IsEnterpriseAdmin
    @PostMapping
    UserAccountDTO create(@RequestBody NewUserAccountDTO accountDTO,
                          Authentication authentication);

    @IsEnterpriseAdmin
    @PutMapping
    UserAccountDTO update(@RequestBody UserAccountDTO accountDTO,
                          Authentication authentication);

    @IsEnterpriseAdmin
    @DeleteMapping(path = "/{accountId}")
    void delete(@PathVariable Long accountId,
                Authentication authentication);

    @IsEnterpriseAdmin
    @PutMapping("/{accountId}/password")
    void resetPassword(@PathVariable Long accountId,
                       @RequestBody PasswordResetDTO passwordResetDTO,
                       Authentication authentication);
}
