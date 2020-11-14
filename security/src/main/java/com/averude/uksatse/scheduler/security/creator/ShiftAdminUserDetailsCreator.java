package com.averude.uksatse.scheduler.security.creator;

import com.averude.uksatse.scheduler.security.details.UserAccountDetails;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.UserAccount;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Arrays;

import static com.averude.uksatse.scheduler.security.authority.Authorities.SHIFT_ADMIN;

@Component
public class ShiftAdminUserDetailsCreator implements UserDetailsCreator {
    @Override
    public <T extends UserAccount> UserDetails create(T t) {
        var shiftAdminUserAccount = (ShiftAdminUserAccount) t;
        return new UserAccountDetails(shiftAdminUserAccount, Arrays.asList(new SimpleGrantedAuthority(SHIFT_ADMIN),
                new SimpleGrantedAuthority("ROLE_" + shiftAdminUserAccount.getRole())));
    }

    @Override
    public Class getUserAccountClass() {
        return ShiftAdminUserAccount.class;
    }
}
