package com.averude.uksatse.scheduler.security.checker;

import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import com.averude.uksatse.scheduler.security.authority.Authorities;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.Collection;

@Component
public class ScheduleControllerSecurity {

    public boolean hasPermission(Authentication authentication,
                                 Collection<WorkDay> workDays) {
        var userAccount = (UserAccount) authentication.getPrincipal();

        if (userAccount.getAuthority().equals(Authorities.DEPARTMENT_ADMIN)
                && userAccount.getRole().equals("ADMIN")) {
//            return checkWorkDaysDepartment(workDays, userAccount);
            return true;
        }

        if (userAccount.getAuthority().equals(Authorities.SHIFT_ADMIN)
                && userAccount.getRole().equals("ADMIN")) {
//            return checkWorkDaysDateAndDepartment(workDays, userAccount);
            var currentMonth = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
            return workDays.stream().noneMatch(workDay -> workDay.getDate().isBefore(currentMonth));
        } else throw new AccessDeniedException(userAccount + " doesn't have authority to perform this operation");
    }

    private boolean checkWorkDaysDepartment(Collection<WorkDay> workDays, UserAccount userAccount) {
        return workDays.stream()
                .allMatch(workDay -> workDay.getDepartmentId().equals(userAccount.getDepartmentId()));
    }

    private boolean checkWorkDaysDateAndDepartment(Collection<WorkDay> workDays, UserAccount userAccount) {
        var currentMonth = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());

        return workDays.stream()
                .allMatch(workDay -> workDay.getDepartmentId().equals(userAccount.getDepartmentId())
                        && !workDay.getDate().isBefore(currentMonth));
    }

}
