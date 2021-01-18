package com.averude.uksatse.scheduler.security.state.dto;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdDtoService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
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
public class DepartmentAdminDtoServiceInvocationHandler implements DtoServiceInvocationHandler {
    @Override
    public <P extends Serializable, C extends Serializable, ID> List<? extends BasicDto<P, C>> invoke(Object userAccount,
                                                                                                      IService<P, ID> service,
                                                                                                      LocalDate from,
                                                                                                      LocalDate to) {
        var departmentAdmin = (DepartmentAdminUserAccount) userAccount;
        var departmentId = departmentAdmin.getDepartmentId();

        if (departmentId == null) throw new NullOrgLevelIdException();

        if (service instanceof IByDepartmentIdDtoService && (from == null) && (to == null)) {
            return ((IByDepartmentIdDtoService<P, C, ID>) service).findAllDtoByDepartmentId(departmentId);
        } else if (service instanceof IByDepartmentIdAndDateDtoService && (from != null) && (to != null)) {
            return ((IByDepartmentIdAndDateDtoService<P, C, ID>) service).findAllDtoByDepartmentIdAndDate(departmentId, from, to);
        } else {
            throw new NoRequiredServiceException(getErrorMessage(service));
        }
    }

    @Override
    public Class getUserAccountClass() {
        return DepartmentAdminUserAccount.class;
    }
}
