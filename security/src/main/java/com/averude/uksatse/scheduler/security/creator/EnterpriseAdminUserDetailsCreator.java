package com.averude.uksatse.scheduler.security.creator;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.entity.EnterpriseAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.UserAccount;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Arrays;

import static com.averude.uksatse.scheduler.security.authority.Authorities.ENTERPRISE_ADMIN;

@Component
public class EnterpriseAdminUserDetailsCreator implements UserDetailsCreator {
    @Override
    public <T extends UserAccount> UserDetails create(T t) {
        var enterpriseAdminUserAccount = (EnterpriseAdminUserAccount) t;
        return new UserAccountDetails(enterpriseAdminUserAccount, Arrays.asList(new SimpleGrantedAuthority(ENTERPRISE_ADMIN),
                new SimpleGrantedAuthority("ROLE_" + enterpriseAdminUserAccount.getRole())));
    }

    @Override
    public Class getUserAccountClass() {
        return EnterpriseAdminUserAccount.class;
    }
}
