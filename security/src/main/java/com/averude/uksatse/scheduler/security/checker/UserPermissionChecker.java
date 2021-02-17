package com.averude.uksatse.scheduler.security.checker;

import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.LinkedList;
import java.util.List;

import static com.averude.uksatse.scheduler.security.authority.Authorities.*;

@Component
public class UserPermissionChecker {

    private static final int MAX_SHIFTS = 100;

    public boolean isGlobalAdmin(Authentication authentication) {
        var userAccount = (UserAccount) authentication.getPrincipal();

        return userAccount.getAuthority().equals(GLOBAL_ADMIN);
    }

    public boolean checkAnyUserOfEnterprise(Authentication authentication, Long enterpriseId) {
        var userAccount = (UserAccount) authentication.getPrincipal();

        if (userAccount.getAuthority().equals(GLOBAL_ADMIN)) {
            return true;
        }

        if (userAccount.getEnterpriseId() != null) {
            return userAccount.getEnterpriseId().equals(enterpriseId);
        }

        return false;
    }

    public boolean checkAnyUserOfDepartment(Authentication authentication, Long departmentId) {
        var userAccount = (UserAccount) authentication.getPrincipal();

        if (userAccount.getAuthority().equals(GLOBAL_ADMIN)) {
            return true;
        }

        if (userAccount.getDepartmentId() != null) {
            return userAccount.getDepartmentId().equals(departmentId);
        }

        return false;
    }

    public boolean checkEnterpriseUser(Authentication authentication, Long enterpriseId) {
        var userAccount = (UserAccount) authentication.getPrincipal();
        return userAccount.getAuthority().equals(ENTERPRISE_ADMIN)
                && userAccount.getDepartmentId().equals(enterpriseId);
    }

    public boolean checkDepartmentUser(Authentication authentication, Long departmentId) {
        var userAccount = (UserAccount) authentication.getPrincipal();
        return userAccount.getAuthority().equals(DEPARTMENT_ADMIN)
                && userAccount.getDepartmentId().equals(departmentId);
    }

    public boolean checkShiftUser(Authentication authentication, List<Long> shiftIds) {
        var userAccount = (UserAccount) authentication.getPrincipal();
        var accountShifts = userAccount.getAccountShifts();

        return userAccount.getAuthority().equals(SHIFT_ADMIN)
                && containsAll(shiftIds, accountShifts);
    }

    private boolean containsAll(List<Long> shiftIds, List<UserAccountShift> accountShifts) {
        if (invalidList(accountShifts) || invalidList(shiftIds)) {
            return false;
        }

        if (shiftIds.size() > MAX_SHIFTS) {
            throw new RuntimeException();
        }

        var result = true;

        var stack = new LinkedList<>(accountShifts);

        outLoop:
        for (var shiftId : shiftIds) {
            var iterator = stack.iterator();
            while (iterator.hasNext()) {
                var accountShift = iterator.next();
                if (accountShift.getShiftId().equals(shiftId)) {
                    iterator.remove();
                    continue outLoop;
                }
            }

            result = false;
            break;
        }

        return result;
    }

    private boolean invalidList(List list) {
        return list == null || list.isEmpty();
    }
}
