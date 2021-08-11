package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.List;

import static com.averude.uksatse.scheduler.security.details.UserLevels.ENTERPRISE;
import static com.averude.uksatse.scheduler.security.model.dto.AccountDTO.convertToDTO;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class EnterpriseUserAccountServiceImpl implements EnterpriseUserAccountService {

    private final PasswordEncoder encoder;
    private final UserAccountRepository userAccountRepository;

    @Override
    public List<UserAccountDTO> findAllEnterpriseUserAccounts() {
        var accounts = userAccountRepository.findAllByLevel(ENTERPRISE);
        return convertToDTO(accounts);
    }

    @Override
    @Transactional
    public UserAccountDTO create(@Valid NewUserAccountDTO accountDTO) {
        var userAccount = new UserAccount(accountDTO);
        userAccount.setPassword(encoder.encode(accountDTO.getPassword()));
        userAccountRepository.save(userAccount);

        return new UserAccountDTO(userAccount);
    }

    @Override
    @Transactional
    public UserAccountDTO update(UserAccountDTO accountDTO) {
        return userAccountRepository.findById(accountDTO.getId())
                .map(account -> {
                    account.refreshFields(accountDTO);
                    account.setEnterpriseId(accountDTO.getEnterpriseId());

                    return new UserAccountDTO(account);
                }).orElseThrow();
    }

    @Override
    @Transactional
    public void delete(Long accountId) {
        userAccountRepository.findById(accountId).ifPresent(userAccountRepository::delete);
    }

    @Override
    @Transactional
    public void resetPassword(Long accountId, PasswordResetDTO passwordResetDTO) {
        userAccountRepository.findById(accountId)
                .ifPresent(account -> account.setPassword(encoder.encode(passwordResetDTO.getNewPassword())));
    }
}
