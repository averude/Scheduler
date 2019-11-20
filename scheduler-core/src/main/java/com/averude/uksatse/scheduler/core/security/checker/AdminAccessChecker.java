package com.averude.uksatse.scheduler.core.security.checker;

import com.averude.uksatse.scheduler.core.security.principal.SchedulerUserPrincipal;

import java.security.Principal;

public class AdminAccessChecker {
    public boolean checkDepartmentAdminId(Principal principal, Long departmentId) {
        if (principal instanceof SchedulerUserPrincipal) {
            SchedulerUserPrincipal schedulerUserPrincipal = (SchedulerUserPrincipal) principal;
            return schedulerUserPrincipal.getUser().getDepartmentId().equals(departmentId);
        } else {
            return false;
        }
    }

    public boolean checkShiftAdminId(Principal principal, Long shiftId) {
        if (principal instanceof SchedulerUserPrincipal) {
            SchedulerUserPrincipal schedulerUserPrincipal = (SchedulerUserPrincipal) principal;
            return schedulerUserPrincipal.getUser().getShiftId().equals(shiftId);
        } else {
            return false;
        }
    }
}
