package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.server.auth.entity.SchedulerUserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;

@Service
public class SchedulerUserDetailsService implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        if ("admin".equals(s)) {
            SchedulerUserDetails userDetails = new SchedulerUserDetails();
            userDetails.setUsername("admin");
            userDetails.setPassword("admin");
            userDetails.setAuthorities(Arrays.asList(new SimpleGrantedAuthority("ROLE_ADMIN")));
            userDetails.setDepartmentId(1L);
            userDetails.setEmployeeId(1L);
            userDetails.setAccountNonExpired(true);
            userDetails.setAccountNonLocked(true);
            userDetails.setCredentialsNonExpired(true);
            userDetails.setEnabled(true);
            return userDetails;
        } else if ("client".equals(s)) {
            SchedulerUserDetails userDetails = new SchedulerUserDetails();
            userDetails.setUsername("client");
            userDetails.setPassword("client");
            userDetails.setAuthorities(Arrays.asList(new SimpleGrantedAuthority("ROLE_CLIENT")));
            userDetails.setDepartmentId(1L);
            userDetails.setEmployeeId(86L);
            userDetails.setAccountNonExpired(true);
            userDetails.setAccountNonLocked(true);
            userDetails.setCredentialsNonExpired(true);
            userDetails.setEnabled(true);
            return userDetails;
        } else {
            throw new UsernameNotFoundException("User is not found");
        }
    }
}
