package com.averude.uksatse.scheduler.security.state.dto;

import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.security.exception.NoServiceInvocationHandlerException;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
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

    private Map<String, DtoServiceInvocationHandler> dtoServiceInvocationHandlerMap;

    @Autowired
    public SimpleDtoByAuthMethodResolver(@Qualifier("dtoServiceInvocationHandlerMap")
                                                     Map<String, DtoServiceInvocationHandler> dtoServiceInvocationHandlerMap) {
        this.dtoServiceInvocationHandlerMap = dtoServiceInvocationHandlerMap;
    }

    @Override
    public <P extends Serializable, C extends Serializable, ID> List<? extends BasicDto<P, C>> findAll(Authentication authentication,
                                                                                                       IService<P, ID> service,
                                                                                                       LocalDate from,
                                                                                                       LocalDate to) {
        var userAccount = (UserAccount) authentication.getPrincipal();

        var serviceInvocationHandler = dtoServiceInvocationHandlerMap.get(userAccount.getAuthority());
        if (serviceInvocationHandler != null) {
            return serviceInvocationHandler.invoke(userAccount, service, from, to);
        } else {
            var errorMessage = "Cannot find Service Invocation Handler for Authority: " + userAccount.getAuthority();
            throw new NoServiceInvocationHandlerException(errorMessage);
        }
    }
}
