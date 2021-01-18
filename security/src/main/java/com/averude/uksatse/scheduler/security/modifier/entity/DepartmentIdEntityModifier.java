package com.averude.uksatse.scheduler.security.modifier.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.UserAccount;
import com.averude.uksatse.scheduler.security.exception.NullOrgLevelIdException;
import com.averude.uksatse.scheduler.shared.service.ShiftService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DepartmentIdEntityModifier<T extends HasDepartmentId> implements EntityModifier<T> {
    private final ShiftService shiftService;

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
        if (account instanceof DepartmentAdminUserAccount) {
            return ((DepartmentAdminUserAccount) account).getDepartmentId();
        } else if (account instanceof ShiftAdminUserAccount) {
            Long shiftId = ((ShiftAdminUserAccount) account).getShiftId();
            return shiftService.findById(shiftId)
                    .map(Shift::getDepartmentId)
                    .orElseThrow();
        } else throw new RuntimeException();
    }
}
