package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.server.auth.service.ShiftUserAccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/users/shift_admins")
@RestController
@RequiredArgsConstructor
public class ShiftUserAccountController {

    private final ShiftUserAccountService shiftUserAccountService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<UserAccountDTO> getAllByDepartmentId(@PathVariable Long departmentId) {
        return shiftUserAccountService.findAllByDepartmentId(departmentId);
    }

    @Logged
    @PreAuthorize("@userAccountControllerSecurity.canSaveShiftAccount(authentication, 'MAP3', #accountDTO)")
    @PostMapping
    public UserAccountDTO create(@RequestBody NewUserAccountDTO accountDTO) {
        return shiftUserAccountService.create(accountDTO);
    }

    @Logged
    @PreAuthorize("@userAccountControllerSecurity.canSaveShiftAccount(authentication, 'MAP3', #accountDTO)")
    @PutMapping
    public UserAccountDTO update(@RequestBody UserAccountDTO accountDTO) {
        return shiftUserAccountService.update(accountDTO);
    }

    @Logged
    @PreAuthorize("@userAccountControllerSecurity.hasAccountPermission(authentication, 'MAP3', #accountId)")
    @DeleteMapping("/{accountId}")
    public void delete(@PathVariable Long accountId) {
        shiftUserAccountService.delete(accountId);
    }

    @Logged
    @PreAuthorize("@userAccountControllerSecurity.hasAccountPermission(authentication, 'MAP3', #accountId)")
    @PutMapping("/{accountId}/password")
    public void resetPassword(@PathVariable Long accountId,
                              @RequestBody PasswordResetDTO passwordResetDTO) {
        shiftUserAccountService.resetPassword(accountId, passwordResetDTO);
    }
}
