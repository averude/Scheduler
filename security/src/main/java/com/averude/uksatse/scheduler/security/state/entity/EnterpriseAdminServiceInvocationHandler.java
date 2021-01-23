package com.averude.uksatse.scheduler.security.state.entity;

import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.security.authority.Authorities;
import com.averude.uksatse.scheduler.security.exception.NoRequiredServiceException;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Component
@Slf4j
public class EnterpriseAdminServiceInvocationHandler implements ServiceInvocationHandler {
    @Override
    public <T extends Serializable, ID> List<T> invoke(UserAccount userAccount,
                                                       Object service,
                                                       LocalDate from,
                                                       LocalDate to) {
        var enterpriseId = userAccount.getEnterpriseId();

        if (enterpriseId == null) throw new NullOrgLevelIdException();

        if (service instanceof IByEnterpriseIdService && (from == null) && (to == null)) {
            return ((IByEnterpriseIdService<T, ID>) service).findAllByEnterpriseId(enterpriseId);
        } else if (service instanceof IByEnterpriseIdAndDateService && (from != null) && (to != null)) {
            return ((IByEnterpriseIdAndDateService<T, ID>) service).findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
        } else {
            String errorMessage = getErrorMessage(service);
            log.error(errorMessage);
            throw new NoRequiredServiceException(errorMessage);
        }
    }

    @Override
    public String getUserAuthority() {
        return Authorities.ENTERPRISE_ADMIN;
    }
}
