package com.averude.uksatse.scheduler.security.state.dto;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public interface DtoServiceInvocationHandler {
    <P extends Serializable, C extends Serializable, ID> List<? extends BasicDto<P, C>> invoke(Object userAccount,
                                                                                               IService<P, ID> service,
                                                                                               LocalDate from,
                                                                                               LocalDate to);

    Class getUserAccountClass();

    default String getErrorMessage(Object o) {
        return "Found wrong instance of service: " + o.getClass();
    }
}
