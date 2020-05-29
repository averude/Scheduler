package com.averude.uksatse.scheduler.controllers.config;

import com.averude.uksatse.scheduler.security.state.dto.DtoServiceInvocationHandler;
import com.averude.uksatse.scheduler.security.state.entity.ServiceInvocationHandler;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class ControllersConfig {

    @Bean
    @Qualifier("serviceInvocationHandlerMap")
    public Map<Class, ServiceInvocationHandler> serviceInvocationHandlerMap(List<ServiceInvocationHandler> serviceInvocationHandlers) {
        var serviceInvocationHandlerHashMap = new HashMap<Class, ServiceInvocationHandler>();
        serviceInvocationHandlers.forEach(handler -> serviceInvocationHandlerHashMap.put(handler.getUserAccountClass(), handler));
        return serviceInvocationHandlerHashMap;
    }

    @Bean
    @Qualifier("dtoServiceInvocationHandlerMap")
    public Map<Class, DtoServiceInvocationHandler> dtoServiceInvocationHandlerMap(List<DtoServiceInvocationHandler> serviceInvocationHandlers) {
        var serviceInvocationHandlerHashMap = new HashMap<Class, DtoServiceInvocationHandler>();
        serviceInvocationHandlers.forEach(handler -> serviceInvocationHandlerHashMap.put(handler.getUserAccountClass(), handler));
        return serviceInvocationHandlerHashMap;
    }
}
