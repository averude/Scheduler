package com.averude.uksatse.scheduler.security.state.entity;

import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdsService;
import com.averude.uksatse.scheduler.security.authority.Authorities;
import com.averude.uksatse.scheduler.security.exception.NoRequiredServiceException;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Slf4j
@Component
public class ShiftAdminServiceInvocationHandler implements ServiceInvocationHandler {
    @Override
    public <T extends Serializable, ID> List<T> invoke(UserAccount userAccount,
                                                       Object service,
                                                       LocalDate from,
                                                       LocalDate to) {
        if (userAccount.getAccountShifts() == null || userAccount.getAccountShifts().isEmpty()) {
            throw new RuntimeException("No account shifts found");
        }

        var shiftIds = userAccount.getAccountShifts()
                .stream()
                .map(UserAccountShift::getShiftId)
                .collect(toList());

        if (shiftIds.isEmpty()) throw new NullOrgLevelIdException();

        if (service instanceof IByShiftIdsService && (from == null) && (to == null)) {
            return ((IByShiftIdsService<T, ID>) service).findAllByShiftIds(shiftIds);
        } else if (service instanceof IByShiftIdAndDateService && (from != null) && (to != null)) {
            return ((IByShiftIdAndDateService<T, ID>) service).findAllByShiftIdsAndDateBetween(shiftIds, from, to);
        } else {
            String errorMessage = getErrorMessage(service);
            log.error(errorMessage);
            throw new NoRequiredServiceException(errorMessage);
        }
    }

    @Override
    public String getUserAuthority() {
        return Authorities.SHIFT_ADMIN;
    }
}
