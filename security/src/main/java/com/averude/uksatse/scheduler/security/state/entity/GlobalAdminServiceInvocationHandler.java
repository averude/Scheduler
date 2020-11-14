package com.averude.uksatse.scheduler.security.state.entity;

import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.security.entity.GlobalAdminUserAccount;
import com.averude.uksatse.scheduler.security.exception.NoRequiredServiceException;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Component
public class GlobalAdminServiceInvocationHandler implements ServiceInvocationHandler {
    @Override
    public <T extends Serializable, ID> List<T> invoke(Object userAccount,
                                                       Object service,
                                                       LocalDate from,
                                                       LocalDate to) {
        if (service instanceof IService) {
            return ((IService<T, ID>) service).findAll();
        } else throw new NoRequiredServiceException();
    }

    @Override
    public Class getUserAccountClass() {
        return GlobalAdminUserAccount.class;
    }
}
