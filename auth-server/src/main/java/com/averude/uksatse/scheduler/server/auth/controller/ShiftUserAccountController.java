package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
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

    @IsDepartmentAdmin
    @PostMapping
    UserAccountDTO create(@RequestBody NewUserAccountDTO accountDTO,
                          Authentication authentication);

    @IsDepartmentAdmin
    @PutMapping
    UserAccountDTO update(@RequestBody UserAccountDTO accountDTO,
                          Authentication authentication);

    @IsDepartmentAdmin
    @DeleteMapping("/{accountId}")
    void delete(@PathVariable Long accountId,
                Authentication authentication);

    @IsDepartmentAdmin
    @PutMapping("/{accountId}/password")
    void resetPassword(@PathVariable Long accountId,
                       @RequestBody PasswordResetDTO passwordResetDTO,
                       Authentication authentication);
}
