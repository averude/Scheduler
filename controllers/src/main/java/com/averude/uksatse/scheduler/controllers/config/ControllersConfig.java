package com.averude.uksatse.scheduler.controllers.config;

import com.averude.uksatse.scheduler.security.state.dto.DtoServiceInvocationHandler;
import com.averude.uksatse.scheduler.security.state.entity.ServiceInvocationHandler;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
@EnableAspectJAutoProxy
public class ControllersConfig {

    @Bean
    @Qualifier("serviceInvocationHandlerMap")
    public Map<String, ServiceInvocationHandler> serviceInvocationHandlerMap(List<ServiceInvocationHandler> serviceInvocationHandlers) {
        var serviceInvocationHandlerHashMap = new HashMap<String, ServiceInvocationHandler>();
        serviceInvocationHandlers.forEach(handler -> serviceInvocationHandlerHashMap.put(handler.getUserAuthority(), handler));
        return serviceInvocationHandlerHashMap;
    }

    @Bean
    @Qualifier("dtoServiceInvocationHandlerMap")
    public Map<String, DtoServiceInvocationHandler> dtoServiceInvocationHandlerMap(List<DtoServiceInvocationHandler> serviceInvocationHandlers) {
        var serviceInvocationHandlerHashMap = new HashMap<String, DtoServiceInvocationHandler>();
        serviceInvocationHandlers.forEach(handler -> serviceInvocationHandlerHashMap.put(handler.getUserAuthority(), handler));
        return serviceInvocationHandlerHashMap;
    }
}
