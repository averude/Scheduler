package com.averude.uksatse.scheduler.server.auth.controller;

import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/users/enterprise_admins")
public interface EnterpriseAccountUserController {

    @IsGlobalAdmin
    @GetMapping
    List<UserAccountDTO> getAllByAuth(Authentication authentication);

    @IsGlobalAdmin
    @PostMapping
    UserAccountDTO create(@RequestBody NewUserAccountDTO accountDTO,
                          Authentication authentication);

    @IsGlobalAdmin
    @PutMapping
    UserAccountDTO update(@RequestBody UserAccountDTO accountDTO,
                          Authentication authentication);

    @IsGlobalAdmin
    @DeleteMapping(path = "/{accountId}")
    void delete(@PathVariable Long accountId,
                Authentication authentication);
}
