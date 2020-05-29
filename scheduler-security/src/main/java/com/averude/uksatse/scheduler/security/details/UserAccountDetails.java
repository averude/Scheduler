package com.averude.uksatse.scheduler.security.details;

import com.averude.uksatse.scheduler.security.entity.UserAccount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

@AllArgsConstructor
@Getter
@Setter
public class UserAccountDetails implements UserDetails {
    private UserAccount userAccount;
    private GrantedAuthority grantedAuthority;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(grantedAuthority);
    }

    @Override
    public String getPassword() {
        return userAccount.getPassword();
    }

    @Override
    public String getUsername() {
        return userAccount.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !userAccount.isLocked();
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return userAccount.isEnabled();
    }
}
