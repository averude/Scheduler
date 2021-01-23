package com.averude.uksatse.scheduler.security.state.entity;

import com.averude.uksatse.scheduler.security.model.entity.UserAccount;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public interface ServiceInvocationHandler {
    <T extends Serializable, ID> List<T> invoke(UserAccount userAccount,
                                                Object service,
                                                LocalDate from,
                                                LocalDate to);
    String getUserAuthority();

    default String getErrorMessage(Object o) {
        return "Found instance of service: " + o.getClass() + "; Required: " + getUserAuthority();
    }
}
