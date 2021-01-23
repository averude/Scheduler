package com.averude.uksatse.scheduler.security.modifier.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.security.authority.Authorities;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
public class DepartmentIdEntityModifier<T extends HasDepartmentId> implements EntityModifier<T> {

    @Override
    public void modify(T hasDepartmentId, Authentication authentication) {
        Long departmentId = getDepartmentId(convertToUserAccount(authentication));

        if (departmentId == null) throw new NullOrgLevelIdException();
        hasDepartmentId.setDepartmentId(departmentId);
    }

    @Override
    public void modifyAll(Iterable<T> iterable, Authentication authentication) {
        Long departmentId = getDepartmentId(convertToUserAccount(authentication));

        if (departmentId == null) throw new NullOrgLevelIdException();
        iterable.forEach(hasDepartmentId -> hasDepartmentId.setDepartmentId(departmentId));
    }

    private Long getDepartmentId(UserAccount account) {
        if (account.getAuthority().equals(Authorities.DEPARTMENT_ADMIN)
                || account.getAuthority().equals(Authorities.SHIFT_ADMIN)) {
            return account.getDepartmentId();
        } else throw new RuntimeException();
    }
}
