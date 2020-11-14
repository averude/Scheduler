package com.averude.uksatse.scheduler.security.creator;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.UserAccount;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Arrays;

import static com.averude.uksatse.scheduler.security.authority.Authorities.DEPARTMENT_ADMIN;

@Component
public class DepartmentAdminUserDetailsCreator implements UserDetailsCreator {
    @Override
    public <T extends UserAccount> UserDetails create(T t) {
        var departmentAdminUserAccount = (DepartmentAdminUserAccount) t;
        return new UserAccountDetails(departmentAdminUserAccount, Arrays.asList(new SimpleGrantedAuthority(DEPARTMENT_ADMIN),
                new SimpleGrantedAuthority("ROLE_" + departmentAdminUserAccount.getRole())));
    }

    @Override
    public Class getUserAccountClass() {
        return DepartmentAdminUserAccount.class;
    }
}
