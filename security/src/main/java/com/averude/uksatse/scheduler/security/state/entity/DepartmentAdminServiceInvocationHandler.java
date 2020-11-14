package com.averude.uksatse.scheduler.security.state.entity;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdService;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.exception.NoRequiredServiceException;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Component
public class DepartmentAdminServiceInvocationHandler implements ServiceInvocationHandler {
    @Override
    public <T extends Serializable, ID> List<T> invoke(Object userAccount,
                                                       Object service,
                                                       LocalDate from,
                                                       LocalDate to) {
        var departmentAdmin = (DepartmentAdminUserAccount) userAccount;
        var departmentId    = departmentAdmin.getDepartmentId();

        if (departmentId == null) throw new NullOrgLevelIdException();

        if (service instanceof IByDepartmentIdService && (from == null) && (to == null)) {
            return ((IByDepartmentIdService<T, ID>) service).findAllByDepartmentId(departmentId);
        } else if (service instanceof IByDepartmentIdAndDateService && (from != null) && (to != null)) {
            return ((IByDepartmentIdAndDateService<T, ID>) service).findAllByDepartmentIdAndDateBetween(departmentId, from, to);
        } else {
            String errorMessage = getErrorMessage(service);
            log.error(errorMessage);
            throw new NoRequiredServiceException(errorMessage);
        }
    }

    @Override
    public Class getUserAccountClass() {
        return DepartmentAdminUserAccount.class;
    }
}
