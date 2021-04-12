package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountDepartmentRepository;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.List;

import static com.averude.uksatse.scheduler.security.authority.Authorities.DEPARTMENT_ADMIN;
import static com.averude.uksatse.scheduler.security.model.dto.AccountDTO.convertToDTO;

@Service
@Transactional(readOnly = true) //https://vladmihalcea.com/read-write-read-only-transaction-routing-spring/
@RequiredArgsConstructor
public class DepartmentUserAccountServiceImpl implements DepartmentUserAccountService {

    private final PasswordEncoder                   encoder;
    private final UserAccountRepository             userAccountRepository;
    private final UserAccountDepartmentRepository   userAccountDepartmentRepository;

    @Override
    public List<UserAccountDTO> findAllByEnterpriseId(Long enterpriseId) {
        var accounts = userAccountRepository.findAllByEnterpriseIdAndAuthority(enterpriseId, DEPARTMENT_ADMIN);
        return convertToDTO(accounts);
    }

    @Override
    @Transactional
    public UserAccountDTO create(@Valid NewUserAccountDTO accountDTO) {
        var userAccount = new UserAccount(accountDTO);
        userAccount.setPassword(encoder.encode(accountDTO.getPassword()));

        userAccountRepository.save(userAccount);

        var accountDepartments = accountDTO.getAccountDepartments(userAccount.getId());
        userAccount.setAccountDepartments(accountDepartments);

        return new UserAccountDTO(userAccount);
    }

    @Override
    @Transactional
    public UserAccountDTO update(UserAccountDTO userAccountDTO) {
        return updateUser(userAccountDTO);
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
                .ifPresent(userAccount -> userAccount.setPassword(encoder.encode(passwordResetDTO.getNewPassword())));
    }

    private UserAccountDTO updateUser(UserAccountDTO accountDTO) {
        return userAccountRepository.findById(accountDTO.getId())
                .map(account -> {
                    account.refreshFields(accountDTO);

                    var accountDepartments = accountDTO.getAccountDepartments(account.getId());
                    if (accountDepartments != null && !accountDepartments.isEmpty()) {
                        userAccountDepartmentRepository.deleteAllByUserAccountIdAndDepartmentIdNotIn(account.getId(), accountDTO.getDepartmentIds());
                        userAccountDepartmentRepository.saveAll(accountDepartments);
                    }

                    return new UserAccountDTO(account);
                }).orElseThrow();
    }
}
