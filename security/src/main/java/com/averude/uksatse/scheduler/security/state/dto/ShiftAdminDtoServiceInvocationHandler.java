package com.averude.uksatse.scheduler.security.state.dto;

import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdsDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.security.authority.Authorities;
import com.averude.uksatse.scheduler.security.exception.NoRequiredServiceException;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Component
public class ShiftAdminDtoServiceInvocationHandler implements DtoServiceInvocationHandler {
    @Override
    public <P extends Serializable, C extends Serializable, ID> List<? extends BasicDto<P, C>> invoke(Object userAccount,
                                                                                                      IService<P, ID> service,
                                                                                                      LocalDate from,
                                                                                                      LocalDate to) {
        var shiftAdmin = (UserAccount) userAccount;
        var shiftIds = shiftAdmin.getAccountShifts().stream()
                .map(UserAccountShift::getShiftId)
                .collect(toList());

        if (shiftIds == null || shiftIds.isEmpty()) throw new NullOrgLevelIdException();

        if (service instanceof IByShiftIdsDtoService && (from == null) && (to == null)) {
            return ((IByShiftIdsDtoService<P, C, ID>) service).findAllDtoByShiftIds(shiftIds);
        } else if (service instanceof IByShiftIdAndDateDtoService && (from != null) && (to != null)) {
            return ((IByShiftIdAndDateDtoService<P, C, ID>) service).findAllDtoByShiftIdsAndDate(shiftIds, from, to);
        } else throw new NoRequiredServiceException(getErrorMessage(service));
    }

    @Override
    public String getUserAuthority() {
        return Authorities.SHIFT_ADMIN;
    }
}
