package com.averude.uksatse.scheduler.security.state.entity;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public interface ServiceInvocationHandler {
    <T extends Serializable, ID> List<T> invoke(Object userAccount,
                                                Object service,
                                                LocalDate from,
                                                LocalDate to);
    Class getUserAccountClass();

    default String getErrorMessage(Object o) {
        return "Found instance of service: " + o.getClass() + "; Required: " + getUserAccountClass();
    }
}
