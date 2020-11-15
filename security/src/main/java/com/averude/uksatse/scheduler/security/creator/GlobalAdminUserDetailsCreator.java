package com.averude.uksatse.scheduler.security.creator;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.entity.GlobalAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.UserAccount;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Arrays;

import static com.averude.uksatse.scheduler.security.authority.Authorities.GLOBAL_ADMIN;

@Component
public class GlobalAdminUserDetailsCreator implements UserDetailsCreator {
    @Override
    public <T extends UserAccount> UserDetails create(T t) {
        var globalAdminUserAccount = (GlobalAdminUserAccount) t;
        return new UserAccountDetails(globalAdminUserAccount, Arrays.asList(new SimpleGrantedAuthority(GLOBAL_ADMIN),
                new SimpleGrantedAuthority("ROLE_" + globalAdminUserAccount.getRole())));
    }

    @Override
    public Class getUserAccountClass() {
        return GlobalAdminUserAccount.class;
    }
}