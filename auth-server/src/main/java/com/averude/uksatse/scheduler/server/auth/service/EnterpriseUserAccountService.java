package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;

import javax.validation.Valid;
import java.util.List;

public interface EnterpriseUserAccountService {
    List<UserAccountDTO> findAllEnterpriseUserAccounts();
    UserAccountDTO create(@Valid NewUserAccountDTO accountDTO);
    UserAccountDTO update(UserAccountDTO accountDTO);
    void delete(Long accountId);
    void resetPassword(Long accountId, PasswordResetDTO passwordResetDTO);
}
