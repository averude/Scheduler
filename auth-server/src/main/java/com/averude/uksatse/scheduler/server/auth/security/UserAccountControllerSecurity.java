package com.averude.uksatse.scheduler.server.auth.security;

import com.averude.uksatse.scheduler.core.util.CollectionUtils;
import com.averude.uksatse.scheduler.security.controller.base.DepartmentLevelSecurity;
import com.averude.uksatse.scheduler.security.model.dto.AccountDTO;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.server.auth.repository.UserAccountRepository;
import com.averude.uksatse.scheduler.shared.repository.common.ShiftRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.function.Function;

import static com.averude.uksatse.scheduler.security.authority.Authorities.*;
import static com.averude.uksatse.scheduler.security.details.AccountUtils.getUserAccount;

@Component
@RequiredArgsConstructor
public class UserAccountControllerSecurity {

    private final UserAccountRepository     userAccountRepository;
    private final ShiftRepository           shiftRepository;
    private final DepartmentLevelSecurity   departmentLevelSecurity;

    public boolean canSaveShiftAccount(Authentication authentication, String mapName, AccountDTO dto){
        if (!dto.getAuthority().equals(SHIFT_ADMIN)) {
            return false;
        }

        var departmentIds = dto.getDepartmentIds();

        if (departmentLevelSecurity.hasPermission(authentication, mapName, departmentIds)) {
            var shifts = shiftRepository.findAllByDepartmentIdInOrderByDepartmentIdAsc(departmentIds);
            return CollectionUtils.containsAll(dto.getShiftIds(), shifts,
                    ((shiftId, shift) -> shift.getId().equals(shiftId)));
        }

        return false;
    }

    public boolean hasAccountPermission(Authentication authentication, String mapName, Long accountId) {
        var originator = getUserAccount(authentication);
        if (departmentLevelSecurity.checkAccess(originator, mapName)) {

            Function<UserAccount, Boolean> function = null;

            if (originator.getAuthority().equals(DEPARTMENT_ADMIN)) {
                function = account -> {
                    var permittedDepartments = originator.getAccountDepartments();
                    var accountDepartments = account.getAccountDepartments();

                    return account.getEnterpriseId().equals(originator.getEnterpriseId()) &&
                            CollectionUtils.containsAll(permittedDepartments, accountDepartments,
                                    (perm, acc) -> perm.getDepartmentId().equals(acc.getDepartmentId()));
                };

            }

            if (originator.getAuthority().equals(ENTERPRISE_ADMIN)) {
                function = account -> account.getEnterpriseId().equals(originator.getEnterpriseId());
            }

            if (function != null) {
                return userAccountRepository.findById(accountId)
                        .map(function).orElse(false);
            }
        }

        return false;
    }
}
