package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountDepartmentRepository;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountShiftRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.List;

import static com.averude.uksatse.scheduler.security.authority.Authorities.SHIFT_ADMIN;
import static com.averude.uksatse.scheduler.security.model.dto.AccountDTO.convertToDTO;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ShiftUserAccountServiceImpl implements ShiftUserAccountService {

    private final PasswordEncoder                   encoder;
    private final UserAccountRepository             userAccountRepository;
    private final UserAccountDepartmentRepository   userAccountDepartmentRepository;
    private final UserAccountShiftRepository        userAccountShiftRepository;

    @Override
    public List<UserAccountDTO> findAllByDepartmentId(Long departmentId) {
        var accounts = userAccountRepository.findAllByDepartmentIdAndAuthority(departmentId, SHIFT_ADMIN);
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

        var accountShifts = accountDTO.getAccountShifts(userAccount.getId());
        userAccount.setAccountShifts(accountShifts);

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
        userAccountRepository.deleteById(accountId);
    }

    @Override
    @Transactional
    public void resetPassword(Long accountId, PasswordResetDTO passwordResetDTO) {
        userAccountRepository.findById(accountId)
                .ifPresent(account -> account.setPassword(encoder.encode(passwordResetDTO.getNewPassword())));
    }

    private UserAccountDTO updateUser(UserAccountDTO accountDTO) {
        return userAccountRepository.findById(accountDTO.getId())
                .map(account -> {
                    account.refreshFields(accountDTO);

                    var accountDepartments = accountDTO.getAccountDepartments(accountDTO.getId());
                    if (accountDepartments != null && !accountDepartments.isEmpty()) {
                        userAccountDepartmentRepository.deleteAllByUserAccountIdAndDepartmentIdNotIn(account.getId(), accountDTO.getDepartmentIds());
                        userAccountDepartmentRepository.saveAll(accountDepartments);
                    }

                    var accountShifts = accountDTO.getAccountShifts(account.getId());
                    if (accountShifts != null && !accountShifts.isEmpty()) {
                        userAccountShiftRepository.deleteAllByUserAccountIdAndShiftIdNotIn(account.getId(), accountDTO.getShiftIds());
                        userAccountShiftRepository.saveAll(accountShifts);
                    }

                    return accountDTO;
                }).orElseThrow();
    }
}
