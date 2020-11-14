package com.averude.uksatse.scheduler.security.state.entity;

import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdService;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.averude.uksatse.scheduler.security.exception.NoRequiredServiceException;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Slf4j
@Component
public class ShiftAdminServiceInvocationHandler implements ServiceInvocationHandler {
    @Override
    public <T extends Serializable, ID> List<T> invoke(Object userAccount,
                                                       Object service,
                                                       LocalDate from,
                                                       LocalDate to) {
        var shiftAdmin = (ShiftAdminUserAccount) userAccount;
        Long shiftId = shiftAdmin.getShiftId();

        if (shiftId == null) throw new NullOrgLevelIdException();

        if (service instanceof IByEnterpriseIdService && (from == null) && (to == null)) {
            return ((IByShiftIdService<T, ID>) service).findAllByShiftId(shiftId);
        } else if (service instanceof IByEnterpriseIdAndDateService && (from != null) && (to != null)) {
            return ((IByShiftIdAndDateService<T, ID>) service).findAllByShiftIdAndDateBetween(shiftId, from, to);
        } else {
            String errorMessage = getErrorMessage(service);
            log.error(errorMessage);
            throw new NoRequiredServiceException(errorMessage);
        }
    }

    @Override
    public Class getUserAccountClass() {
        return ShiftAdminUserAccount.class;
    }
}
