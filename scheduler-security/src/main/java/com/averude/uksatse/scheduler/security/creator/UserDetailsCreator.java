package com.averude.uksatse.scheduler.security.creator;

import com.averude.uksatse.scheduler.security.entity.UserAccount;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserDetailsCreator {
    <T extends UserAccount> UserDetails create(T t);

    Class getUserAccountClass();
}
