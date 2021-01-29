package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.exception.InvalidOldPasswordException;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.PasswordChangeDTO;
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

    private final PasswordEncoder encoder;
    private final UserAccountRepository userAccountRepository;
    private final UserAccountShiftRepository userAccountShiftRepository;
    private final UserAccountDTOConverter dtoConverter;

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
        return userAccountRepository.findByUsername(username)
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
    public UserAccountDTO createDepartmentUser(@Valid NewUserAccountDTO accountDTO, UserAccount originator) {
        var userAccount = dtoConverter.convertToUserAccount(accountDTO, originator.getEnterpriseId(), accountDTO.getDepartmentId());
        userAccountRepository.save(userAccount);
        return dtoConverter.convertToDTO(userAccount);
    }

    @Override
    @Transactional
    public UserAccountDTO createShiftUser(@Valid NewUserAccountDTO accountDTO, UserAccount originator) {
        var userAccount = dtoConverter.convertToUserAccount(accountDTO, originator.getEnterpriseId(), originator.getDepartmentId());
        userAccountRepository.save(userAccount);

        var accountShifts = dtoConverter.getAccountShifts(accountDTO.getShiftIds(), userAccount.getId());
        userAccount.setAccountShifts(accountShifts);

        return dtoConverter.convertToDTO(userAccount);
    }

    @Override
    @Transactional
    public UserAccountDTO updateDepartmentUser(UserAccountDTO userAccountDTO, UserAccount originator) {
        if (userAccountDTO.getAuthority().equals(DEPARTMENT_ADMIN)) {
            userAccountDTO.setEnterpriseId(originator.getEnterpriseId());
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
                    account.setUsername(accountDTO.getUsername());
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
        if (userAccount.getAuthority().equals(ENTERPRISE_ADMIN)) {
            userAccountRepository.delete(userAccount);
        }
    }

    @Override
    @Transactional
    public void deleteDepartmentUser(Long accountId, UserAccount originator) {
        var userAccount = userAccountRepository.findById(accountId).orElseThrow();
        if (userAccount.getAuthority().equals(DEPARTMENT_ADMIN)
                && originator.getEnterpriseId().equals(userAccount.getEnterpriseId())) {
            userAccountRepository.delete(userAccount);
        }
    }

    @Override
    @Transactional
    public void deleteShiftUser(Long accountId, UserAccount originator) {
        var userAccount = userAccountRepository.findById(accountId).orElseThrow();
        if (userAccount.getAuthority().equals(SHIFT_ADMIN)
                && originator.getDepartmentId().equals(userAccount.getDepartmentId())) {
            userAccountRepository.delete(userAccount);
        }
    }
}
