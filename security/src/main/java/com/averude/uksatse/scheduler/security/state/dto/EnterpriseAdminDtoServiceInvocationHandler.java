package com.averude.uksatse.scheduler.security.state.dto;

import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.security.authority.Authorities;
import com.averude.uksatse.scheduler.security.exception.NoRequiredServiceException;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Component
public class EnterpriseAdminDtoServiceInvocationHandler implements DtoServiceInvocationHandler {
    @Override
    public <P extends Serializable, C extends Serializable, ID> List<? extends BasicDto<P, C>> invoke(Object userAccount,
                                                                                                      IService<P, ID> service,
                                                                                                      LocalDate from,
                                                                                                      LocalDate to) {
        var account = (UserAccount) userAccount;
        var enterpriseId = account.getEnterpriseId();

        if (enterpriseId == null) throw new NullOrgLevelIdException();

        if (service instanceof IByEnterpriseIdDtoService && (from == null) && (to == null)) {
            return ((IByEnterpriseIdDtoService<P, C, ID>) service).findAllDtoByEnterpriseId(enterpriseId);
        } else throw new NoRequiredServiceException(getErrorMessage(service));
    }

    @Override
    public String getUserAuthority() {
        return Authorities.ENTERPRISE_ADMIN;
    }
}
