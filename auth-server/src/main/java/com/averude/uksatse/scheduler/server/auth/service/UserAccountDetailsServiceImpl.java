package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.exception.InvalidOldPasswordException;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordChangeDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordResetDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.converter.UserAccountDTOConverter;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountShiftRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

import static com.averude.uksatse.scheduler.security.authority.Authorities.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserAccountDetailsServiceImpl implements UserAccountDetailsService {

    private final PasswordEncoder               encoder;
    private final UserAccountRepository         userAccountRepository;
    private final UserAccountShiftRepository    userAccountShiftRepository;
    private final UserAccountDTOConverter       dtoConverter;

    @Override
    @Transactional
    public List<UserAccountDTO> findAllEnterpriseUserAccounts() {
        var accounts = userAccountRepository.findAllByAuthority(ENTERPRISE_ADMIN);
        return dtoConverter.convertToDTO(accounts);
    }

    @Override
    @Transactional
    public List<UserAccountDTO> findAllByEnterpriseId(Long enterpriseId) {
        var accounts = userAccountRepository.findAllByEnterpriseIdAndAuthority(enterpriseId, DEPARTMENT_ADMIN);
        return dtoConverter.convertToDTO(accounts);
    }

    @Override
    @Transactional
    public List<UserAccountDTO> findAllByDepartmentId(Long departmentId) {
        var accounts = userAccountRepository.findAllByDepartmentIdAndAuthority(departmentId, SHIFT_ADMIN);
        return dtoConverter.convertToDTO(accounts);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        var lowercaseUsername = username.toLowerCase();
        return userAccountRepository.findByUsername(lowercaseUsername)
                .map(userAccount -> new UserAccountDetails(userAccount,
                        Arrays.asList(
                                new SimpleGrantedAuthority(userAccount.getAuthority()),
                                new SimpleGrantedAuthority("ROLE_" + userAccount.getRole())
                        )))
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    @Transactional
    public UserAccountDTO createEnterpriseUser(@Valid NewUserAccountDTO accountDTO, UserAccount originator) {
        var userAccount = dtoConverter.convertToUserAccount(accountDTO, accountDTO.getEnterpriseId(), null);
        userAccountRepository.save(userAccount);

        return dtoConverter.convertToDTO(userAccount);
    }

    @Override
    @Transactional
    public UserAccountDTO createDepartmentUser(@Valid NewUserAccountDTO accountDTO) {
        var userAccount = dtoConverter.convertToUserAccount(accountDTO, accountDTO.getEnterpriseId(), accountDTO.getDepartmentId());
        userAccountRepository.save(userAccount);
        return dtoConverter.convertToDTO(userAccount);
    }

    @Override
    @Transactional
    public UserAccountDTO createShiftUser(@Valid NewUserAccountDTO accountDTO, UserAccount originator) {
        var userAccount = dtoConverter.convertToUserAccount(accountDTO, accountDTO.getEnterpriseId(), accountDTO.getDepartmentId());
        userAccountRepository.save(userAccount);

        var accountShifts = dtoConverter.getAccountShifts(accountDTO.getShiftIds(), userAccount.getId());
        userAccount.setAccountShifts(accountShifts);

        return dtoConverter.convertToDTO(userAccount);
    }

    @Override
    @Transactional
    public UserAccountDTO updateDepartmentUser(UserAccountDTO userAccountDTO) {
        if (userAccountDTO.getAuthority().equals(DEPARTMENT_ADMIN)) {
            return updateUser(userAccountDTO);
        } else throw new RuntimeException();
    }

    @Override
    @Transactional
    public UserAccountDTO updateShiftUser(UserAccountDTO userAccountDTO, UserAccount originator) {
        if (userAccountDTO.getAuthority().equals(SHIFT_ADMIN)) {
            userAccountDTO.setEnterpriseId(originator.getEnterpriseId());
            userAccountDTO.setDepartmentId(originator.getDepartmentId());
            return updateUser(userAccountDTO);
        } else throw new RuntimeException();
    }

    @Override
    @Transactional
    public void changePassword(@Valid PasswordChangeDTO passwordChangeDTO,
                               UserAccount originator) {
        // Move to the validation level
        if (!passwordChangeDTO.getNewPassword().equals(passwordChangeDTO.getConfirmPassword())) {
            throw new RuntimeException();
        }

        if (passwordChangeDTO.getOldPassword().equals(passwordChangeDTO.getNewPassword())) {
            throw new RuntimeException();
        }

        var accountId = originator.getId();
        userAccountRepository.findById(accountId).ifPresent(account -> {
            if (encoder.matches(passwordChangeDTO.getOldPassword(), account.getPassword())) {
                account.setPassword(encoder.encode(passwordChangeDTO.getNewPassword()));
                log.info("User:{} - Password successfully changed", originator);
            } else throw new InvalidOldPasswordException();
        });
    }

    @Override
    @Transactional
    public UserAccountDTO updateUser(UserAccountDTO accountDTO) {
        return userAccountRepository.findById(accountDTO.getId())
                .map(account -> {
                    account.setUsername(accountDTO.getUsername().toLowerCase());
                    account.setName(accountDTO.getName());
                    account.setRole(accountDTO.getRole());
                    account.setAuthority(accountDTO.getAuthority());
                    account.setEnterpriseId(accountDTO.getEnterpriseId());
                    account.setDepartmentId(accountDTO.getDepartmentId());

                    var accountShifts = dtoConverter.getAccountShifts(accountDTO.getShiftIds(), account.getId());
                    if (accountShifts != null && !accountShifts.isEmpty()) {
                        userAccountShiftRepository.deleteAllByUserAccountIdAndShiftIdNotIn(account.getId(), accountDTO.getShiftIds());
                        userAccountShiftRepository.saveAll(accountShifts);
                    }

                    return dtoConverter.convertToDTO(account, accountDTO.getShiftIds());
                }).orElseThrow();
    }

    @Override
    @Transactional
    public void deleteEnterpriseUser(Long accountId, UserAccount originator) {
        var userAccount = userAccountRepository.findById(accountId).orElseThrow();
        if (canModifyEnterpriseUser(userAccount, originator)) {
            userAccountRepository.delete(userAccount);
        }
    }

    @Override
    @Transactional
    public void deleteDepartmentUser(Long accountId) {
        userAccountRepository.findById(accountId).ifPresent(userAccountRepository::delete);
    }

    @Override
    @Transactional
    public void deleteShiftUser(Long accountId, UserAccount originator) {
        var userAccount = userAccountRepository.findById(accountId).orElseThrow();
        if (canModifyShiftUser(originator, userAccount)) {
            userAccountRepository.delete(userAccount);
        }
    }

    @Override
    @Transactional
    public void resetEnterpriseUserPassword(Long accountId,
                                            PasswordResetDTO passwordResetDTO,
                                            UserAccount originator) {
        var userAccount = userAccountRepository.findById(accountId).orElseThrow();
        if (canModifyEnterpriseUser(userAccount, originator)) {
            userAccount.setPassword(encoder.encode(passwordResetDTO.getNewPassword()));
        } else throw new RuntimeException();
    }

    @Override
    @Transactional
    public void resetDepartmentUserPassword(Long accountId,
                                            PasswordResetDTO passwordResetDTO) {
        userAccountRepository.findById(accountId)
                .ifPresent(userAccount -> userAccount.setPassword(encoder.encode(passwordResetDTO.getNewPassword())));
    }

    @Override
    @Transactional
    public void resetShiftUserPassword(Long accountId,
                                       PasswordResetDTO passwordResetDTO,
                                       UserAccount originator) {
        var userAccount = userAccountRepository.findById(accountId).orElseThrow();
        if (canModifyShiftUser(originator, userAccount)) {
            userAccount.setPassword(encoder.encode(passwordResetDTO.getNewPassword()));
        } else throw new RuntimeException();
    }

    private boolean canModifyEnterpriseUser(UserAccount userAccount, UserAccount originator) {
        return userAccount.getAuthority().equals(ENTERPRISE_ADMIN);
    }

    private boolean canModifyDepartmentUser(UserAccount originator, UserAccount userAccount) {
        return userAccount.getAuthority().equals(DEPARTMENT_ADMIN)
                && originator.getEnterpriseId().equals(userAccount.getEnterpriseId());
    }

    private boolean canModifyShiftUser(UserAccount originator, UserAccount userAccount) {
        return userAccount.getAuthority().equals(SHIFT_ADMIN)
                && originator.getDepartmentId().equals(userAccount.getDepartmentId());
    }
}
