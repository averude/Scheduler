package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.core.entity.User;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.core.security.principal.SchedulerUserPrincipal;
import com.averude.uksatse.scheduler.shared.repository.AuthorityRepository;
import com.averude.uksatse.scheduler.shared.repository.UserRepository;
import com.averude.uksatse.scheduler.shared.service.AbstractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor.GLOBAL_ADMIN;

@Service
public class SchedulerUserDetailsServiceImpl
        extends AbstractService<User, Long> implements SchedulerUserDetailsService {

    private final UserRepository userRepository;
    private final AuthorityRepository authorityRepository;
    private final PasswordEncoder encoder;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public SchedulerUserDetailsServiceImpl(UserRepository userRepository,
                                           AuthorityRepository authorityRepository,
                                           TokenExtraDetailsExtractor detailsExtractor,
                                           PasswordEncoder encoder) {
        super(userRepository);
        this.userRepository = userRepository;
        this.authorityRepository = authorityRepository;
        this.detailsExtractor = detailsExtractor;
        this.encoder = encoder;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User is not found"));
        return new SchedulerUserPrincipal(user);
    }

    @Override
    @Transactional
    public User save(User user) {
        encodePassword(user);
        return super.save(user);
    }

    @Override
    @Transactional
    public Iterable<User> findAllByDepartmentId(Long departmentId) {
        return userRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<User> findAllByAuth(Authentication authentication) {
        boolean contains = authentication.getAuthorities()
                .stream()
                .anyMatch(authority -> ((GrantedAuthority) authority).getAuthority().equals(GLOBAL_ADMIN));
        if (contains) {
            return super.findAll();
        }

        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return findAllByDepartmentId(departmentId);
    }

    private void encodePassword(User user) {
        String hash = encoder.encode(user.getPassword());
        user.setPassword(hash);
    }
}
