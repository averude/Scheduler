package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.server.auth.service.EnterpriseUserAccountService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/users/enterprises")
@RequiredArgsConstructor
public class EnterpriseAccountUserControllerImpl {

    private final EnterpriseUserAccountService enterpriseUserAccountService;

    @Logged
    @IsGlobalAdmin
    @GetMapping
    public List<UserAccountDTO> getAllByAuth() {
        return enterpriseUserAccountService.findAllEnterpriseUserAccounts();
    }

    @Logged
    @IsGlobalAdmin
    @PostMapping
    public UserAccountDTO create(@RequestBody NewUserAccountDTO accountDTO) {
        return enterpriseUserAccountService.create(accountDTO);
    }

    @Logged
    @IsGlobalAdmin
    @PutMapping
    public UserAccountDTO update(@RequestBody UserAccountDTO accountDTO) {
        return enterpriseUserAccountService.update(accountDTO);
    }

    @Logged
    @IsGlobalAdmin
    @DeleteMapping(path = "/{accountId}")
    public void delete(@PathVariable Long accountId) {
        enterpriseUserAccountService.delete(accountId);
    }

    @Logged
    @IsGlobalAdmin
    @PutMapping("/{accountId}/password")
    public void resetPassword(@PathVariable Long accountId,
                              @RequestBody PasswordResetDTO passwordResetDTO) {
        enterpriseUserAccountService.resetPassword(accountId, passwordResetDTO);
    }
}
