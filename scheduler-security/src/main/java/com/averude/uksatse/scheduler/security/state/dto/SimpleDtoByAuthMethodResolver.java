package com.averude.uksatse.scheduler.security.state.dto;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.security.exception.NoServiceInvocationHandlerException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Component
public class SimpleDtoByAuthMethodResolver implements IByAuthDtoMethodResolver {

    private Map<Class, DtoServiceInvocationHandler> dtoServiceInvocationHandlerMap;

    @Autowired
    public SimpleDtoByAuthMethodResolver(@Qualifier("dtoServiceInvocationHandlerMap")
                                                     Map<Class, DtoServiceInvocationHandler> dtoServiceInvocationHandlerMap) {
        this.dtoServiceInvocationHandlerMap = dtoServiceInvocationHandlerMap;
    }

    @Override
    public <P extends Serializable, C extends Serializable, ID> List<BasicDto<P, C>> findAll(Authentication authentication,
                                                                                             IService<P, ID> service,
                                                                                             LocalDate from,
                                                                                             LocalDate to) {
        var userAccount = authentication.getPrincipal();

        var serviceInvocationHandler = dtoServiceInvocationHandlerMap.get(userAccount.getClass());
        if (serviceInvocationHandler != null) {
            return serviceInvocationHandler.invoke(userAccount, service, from, to);
        } else {
            var errorMessage = "Cannot find Service Invocation Handler for Class: " + userAccount.getClass();
            throw new NoServiceInvocationHandlerException(errorMessage);
        }
    }
}
