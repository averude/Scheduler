package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.security.creator.UserDetailsCreator;
import com.averude.uksatse.scheduler.security.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class UserAccountDetailsServiceImpl
        extends AService<UserAccount, String>
        implements UserAccountDetailsService {

    private final PasswordEncoder encoder;
    private final UserAccountRepository userAccountRepository;
    private final Map<Class, UserDetailsCreator> detailsCreatorMap;

    @Autowired
    public UserAccountDetailsServiceImpl(@NonNull UserAccountRepository userAccountRepository,
                                         @NonNull @Qualifier("detailsCreatorMap") Map<Class, UserDetailsCreator> detailsCreatorMap,
                                         PasswordEncoder encoder) {
        super(userAccountRepository);
        this.userAccountRepository = userAccountRepository;
        this.detailsCreatorMap = detailsCreatorMap;
        this.encoder = encoder;
    }

    @Override
    @Transactional
    public List<UserAccount> findAllByEnterpriseId(Long enterpriseId) {
        return userAccountRepository.findAllByEnterpriseId(enterpriseId);
    }

    @Override
    @Transactional
    public List<UserAccount> findAllByDepartmentId(Long departmentId) {
        return userAccountRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        return userAccountRepository.findById(s)
                .map(userAccount -> {
                    var userDetailsCreator = detailsCreatorMap.get(userAccount.getClass());
                    if (userDetailsCreator != null) {
                        return userDetailsCreator.create(userAccount);
                    } else return null;
                })
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    @Override
    @Transactional
    public UserAccount save(UserAccount user) {
        encodePassword(user);
        log.info("User {} created/updated in the database", user.getUsername());
        return super.save(user);
    }

    private void encodePassword(UserAccount user) {
        String hash = encoder.encode(user.getPassword());
        user.setPassword(hash);
    }
}

