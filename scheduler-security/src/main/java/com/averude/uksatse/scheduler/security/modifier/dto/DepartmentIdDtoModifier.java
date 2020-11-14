package com.averude.uksatse.scheduler.security.modifier.dto;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.io.Serializable;

@Component
public class DepartmentIdDtoModifier<P extends HasDepartmentId, C extends Serializable> implements DtoModifier<P, C> {
    @Override
    public void modify(BasicDto<P, C> dto, Authentication authentication) {
        var userAccount = (DepartmentAdminUserAccount) authentication.getPrincipal();
        var departmentId = userAccount.getDepartmentId();

        if (departmentId == null) throw new NullOrgLevelIdException();
        dto.getParent().setDepartmentId(departmentId);
    }
}
