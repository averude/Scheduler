package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;

import javax.validation.Valid;
import java.util.List;

public interface EnterpriseUserAccountService {
    List<UserAccountDTO> findAllEnterpriseUserAccounts();
    UserAccountDTO create(@Valid NewUserAccountDTO accountDTO, UserAccount originator);
    UserAccountDTO update(UserAccountDTO accountDTO);
    void delete(Long accountId, UserAccount originator);
    void resetPassword(Long accountId, PasswordResetDTO passwordResetDTO, UserAccount originator);
}
