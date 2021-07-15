package com.averude.uksatse.scheduler.security.controller.special;

import com.averude.uksatse.scheduler.security.controller.base.AccessMapSecurityChecker;
import com.averude.uksatse.scheduler.shared.repository.WorkScheduleViewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import static com.averude.uksatse.scheduler.security.authority.Authorities.DEPARTMENT_ADMIN;
import static com.averude.uksatse.scheduler.security.authority.Authorities.ENTERPRISE_ADMIN;
import static com.averude.uksatse.scheduler.security.details.AccountUtils.getUserAccount;

@Component
@RequiredArgsConstructor
public class ScheduleViewSecurity {

    private final WorkScheduleViewRepository    workScheduleViewRepository;
    private final AccessMapSecurityChecker      accessMapSecurityChecker;

    public boolean hasPermission(Authentication authentication, String mapName, Long viewId) {
        var account = getUserAccount(authentication);
        if (accessMapSecurityChecker.checkAccess(account, mapName)) {

            if (account.getAuthority().equals(DEPARTMENT_ADMIN)) {
                return workScheduleViewRepository.getById(viewId)
                        .map(view -> account.getAccountDepartments().stream()
                                .anyMatch(userAccountDepartment ->
                                        userAccountDepartment.getDepartmentId().equals(view.getDepartmentId())))
                        .orElse(false);
            }

            if (account.getAuthority().equals(ENTERPRISE_ADMIN)) {
                return workScheduleViewRepository.getById(viewId)
                        .map(view -> account.getEnterpriseId().equals(view.getEnterpriseId()))
                        .orElse(false);
            }

        }

        return false;
    }
}
