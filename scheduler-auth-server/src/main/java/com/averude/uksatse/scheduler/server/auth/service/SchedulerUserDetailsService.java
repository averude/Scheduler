package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.core.entity.User;
import com.averude.uksatse.scheduler.shared.service.GenericService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface SchedulerUserDetailsService extends UserDetailsService, GenericService<User, Long> {
    UserDetails loadUserByUsername(String s) throws UsernameNotFoundException;

    Iterable<User> findAllByDepartmentId(Long departmentId);

    Iterable<User> findAllByAuth(Authentication authentication);
}
