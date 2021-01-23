package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.authority.Authorities;
import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.model.dto.AccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@Service
public class UserAccountDetailsServiceImpl
        extends AService<UserAccount, Long>
        implements UserAccountDetailsService {

    private final PasswordEncoder encoder;
    private final UserAccountRepository userAccountRepository;

    @Autowired
    public UserAccountDetailsServiceImpl(@NonNull UserAccountRepository userAccountRepository,
                                         PasswordEncoder encoder) {
        super(userAccountRepository);
        this.userAccountRepository = userAccountRepository;
        this.encoder = encoder;
    }

    @Override
    @Transactional
    public List<UserAccount> findAllByEnterpriseId(Long enterpriseId) {
        return userAccountRepository.findAllByEnterpriseIdAndAuthority(enterpriseId, Authorities.DEPARTMENT_ADMIN);
    }

    @Override
    @Transactional
    public List<UserAccount> findAllByDepartmentId(Long departmentId) {
        return userAccountRepository.findAllByDepartmentIdAndAuthority(departmentId, Authorities.SHIFT_ADMIN);
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
    public UserAccount save(UserAccount user) {
        encodePassword(user);
        return super.save(user);
    }

    @Override
    @Transactional
    public AccountDTO saveShiftAccount(AccountDTO dto, UserAccount creatorUserAccount) {
        if (!creatorUserAccount.getAuthority().equals(Authorities.DEPARTMENT_ADMIN)) {
            throw new AccessDeniedException("");
        }

        var account = dto.getUserAccount();
        encodePassword(account);
        account.setEnterpriseId(creatorUserAccount.getEnterpriseId());
        account.setDepartmentId(creatorUserAccount.getDepartmentId());

        if (account.getId() == null) {
            userAccountRepository.save(account);
        }

        List<Long> shiftIds = dto.getShiftIds();
        if (shiftIds != null && !shiftIds.isEmpty()) {
            var accountShifts = shiftIds.stream()
                    .map(shiftId -> new UserAccountShift(account.getId(), shiftId))
                    .collect(toList());
            account.setAccountShifts(accountShifts);
            userAccountRepository.save(account);
            return dto;
        } else throw new RuntimeException();
    }

    private void encodePassword(UserAccount user) {
        String hash = encoder.encode(user.getPassword());
        user.setPassword(hash);
    }
}

