package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.exception.InvalidOldPasswordException;
import com.averude.uksatse.scheduler.security.model.dto.PasswordChangeDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
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

@Slf4j
@Service
@RequiredArgsConstructor
public class UserAccountDetailsServiceImpl implements UserAccountDetailsService {

    private final PasswordEncoder       encoder;
    private final UserAccountRepository userAccountRepository;

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
    public void changePassword(@Valid PasswordChangeDTO passwordChangeDTO,
                               UserAccount originator) {
        var accountId = originator.getId();
        userAccountRepository.findById(accountId).ifPresent(account -> {
            if (encoder.matches(passwordChangeDTO.getOldPassword(), account.getPassword())) {
                account.setPassword(encoder.encode(passwordChangeDTO.getNewPassword()));
                log.info("User:{} - Password successfully changed", originator);
            } else throw new InvalidOldPasswordException();
        });
    }
}
