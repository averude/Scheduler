package com.averude.uksatse.scheduler.security.details;

import com.averude.uksatse.scheduler.security.entity.UserAccount;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.StringJoiner;

@AllArgsConstructor
@Getter
@Setter
public class UserAccountDetails implements UserDetails {
    private UserAccount userAccount;
    private List<GrantedAuthority> grantedAuthorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
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

    @Override
    public String toString() {
        return new StringJoiner(", ", UserAccountDetails.class.getSimpleName() + "[", "]")
                .add("username=" + userAccount.getUsername())
                .add("authorities=" + grantedAuthorities)
                .toString();
    }
}