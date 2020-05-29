package com.averude.uksatse.scheduler.security.modifier.entity;

import com.averude.uksatse.scheduler.core.entity.interfaces.HasDepartmentId;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class DepartmentIdEntityModifier<T extends HasDepartmentId> implements EntityModifier<T> {
    @Override
    public void modify(T hasDepartmentId, Authentication authentication) {
        var userAccount = (DepartmentAdminUserAccount) convertToUserAccount(authentication);
        Long departmentId = userAccount.getDepartmentId();

        if (departmentId == null) throw new NullOrgLevelIdException();
        hasDepartmentId.setDepartmentId(departmentId);
    }
}
