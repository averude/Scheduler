package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.server.auth.service.UserAccountDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RequestMapping("/users/department_admins")
@RestController
@RequiredArgsConstructor
public class DepartmentUserAccountController {

    private final UserAccountDetailsService userAccountDetailsService;

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #enterpriseId)")
    @GetMapping("/enterprises/{enterpriseId}")
    public List<UserAccountDTO> getAllByEnterpriseId(@PathVariable Long enterpriseId) {
        return userAccountDetailsService.findAllByEnterpriseId(enterpriseId);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #accountDTO.enterpriseId)")
    @PostMapping
    public UserAccountDTO create(@RequestBody NewUserAccountDTO accountDTO) {
        return userAccountDetailsService.createDepartmentUser(accountDTO);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #accountDTO.enterpriseId)")
    @PutMapping
    public UserAccountDTO update(@RequestBody UserAccountDTO accountDTO) {
        return userAccountDetailsService.updateDepartmentUser(accountDTO);
    }

    @Logged
    @IsEnterpriseAdmin
    @DeleteMapping(path = "/{accountId}")
    public void delete(@PathVariable Long accountId) {
        userAccountDetailsService.deleteDepartmentUser(accountId);
    }

    @Logged
    @IsEnterpriseAdmin
    @PutMapping("/{accountId}/password")
    public void resetPassword(@PathVariable Long accountId,
                              @RequestBody PasswordResetDTO passwordResetDTO) {
        userAccountDetailsService.resetDepartmentUserPassword(accountId, passwordResetDTO);
    }
}
