package com.averude.uksatse.scheduler.security.state.entity;

import com.averude.uksatse.scheduler.security.exception.NoServiceInvocationHandlerException;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class SimpleByAuthMethodResolver implements IByAuthMethodResolver {

    private Map<String, ServiceInvocationHandler> serviceInvocationHandlerMap;

    @Autowired
    public SimpleByAuthMethodResolver(@Qualifier("serviceInvocationHandlerMap")
                                                  Map<String, ServiceInvocationHandler> serviceInvocationHandlerMap) {
        this.serviceInvocationHandlerMap = serviceInvocationHandlerMap;
    }

    @Override
    public <T extends Serializable, ID> List<T> findAll(Authentication authentication,
                                                        Object service,
                                                        LocalDate from,
                                                        LocalDate to) {
        var userAccount = (UserAccount) authentication.getPrincipal();

        var serviceInvocationHandler = serviceInvocationHandlerMap.get(userAccount.getAuthority());
        if (serviceInvocationHandler != null) {
            return serviceInvocationHandler.invoke(userAccount, service, from, to);
        } else {
            var errorMessage = "Cannot find Service Invocation Handler for Authority: " + userAccount.getAuthority();
            log.error(errorMessage);
            throw new NoServiceInvocationHandlerException(errorMessage);
        }
    }
}
