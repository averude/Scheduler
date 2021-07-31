package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.exception.InvalidOldPasswordException;
import com.averude.uksatse.scheduler.security.model.dto.PasswordChangeDTO;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.Valid;

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
                .map(UserAccountDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    @Transactional
    public void changePassword(@Valid PasswordChangeDTO passwordChangeDTO,
                               String username) {
        userAccountRepository.findByUsername(username).ifPresent(account -> {
            if (encoder.matches(passwordChangeDTO.getOldPassword(), account.getPassword())) {
                account.setPassword(encoder.encode(passwordChangeDTO.getNewPassword()));
                log.info("User: {} - Password successfully changed", account);
            } else throw new InvalidOldPasswordException();
        });
    }
}
