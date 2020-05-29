package com.averude.uksatse.scheduler.server.auth.service;

import com.averude.uksatse.scheduler.core.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.core.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.service.IService;
import com.averude.uksatse.scheduler.security.entity.UserAccount;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserAccountDetailsService extends UserDetailsService,
        IByEnterpriseIdService<UserAccount, String>,
        IByDepartmentIdService<UserAccount, String>,
        IService<UserAccount, String> {
}
