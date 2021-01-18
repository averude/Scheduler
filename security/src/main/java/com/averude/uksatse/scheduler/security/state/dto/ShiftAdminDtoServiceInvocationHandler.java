package com.averude.uksatse.scheduler.security.state.dto;

import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.averude.uksatse.scheduler.security.exception.NoRequiredServiceException;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Component
public class ShiftAdminDtoServiceInvocationHandler implements DtoServiceInvocationHandler {
    @Override
    public <P extends Serializable, C extends Serializable, ID> List<? extends BasicDto<P, C>> invoke(Object userAccount,
                                                                                                      IService<P, ID> service,
                                                                                                      LocalDate from,
                                                                                                      LocalDate to) {
        var shiftAdmin = (ShiftAdminUserAccount) userAccount;
        var shiftId = shiftAdmin.getShiftId();

        if (shiftId == null) throw new NullOrgLevelIdException();

        if (service instanceof IByShiftIdDtoService && (from == null) && (to == null)) {
            return ((IByShiftIdDtoService<P, C, ID>) service).findAllDtoByShiftId(shiftId);
        } else if (service instanceof IByShiftIdAndDateDtoService && (from != null) && (to != null)) {
            return ((IByShiftIdAndDateDtoService<P, C, ID>) service).findAllDtoByShiftIdAndDate(shiftId, from, to);
        } else throw new NoRequiredServiceException(getErrorMessage(service));
    }

    @Override
    public Class getUserAccountClass() {
        return ShiftAdminUserAccount.class;
    }
}
