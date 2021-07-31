package com.averude.uksatse.scheduler.security.controller.special;

import com.averude.uksatse.scheduler.security.controller.base.AccessMapSecurityChecker;
import com.averude.uksatse.scheduler.shared.repository.WorkScheduleViewRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import static com.averude.uksatse.scheduler.security.details.UserLevels.DEPARTMENT;
import static com.averude.uksatse.scheduler.security.details.UserLevels.ENTERPRISE;
import static com.averude.uksatse.scheduler.security.utils.SecurityUtils.getLongClaim;
import static com.averude.uksatse.scheduler.security.utils.SecurityUtils.getLongListClaim;

@Component
@RequiredArgsConstructor
public class ScheduleViewSecurity {

    private final WorkScheduleViewRepository    workScheduleViewRepository;
    private final AccessMapSecurityChecker      accessMapSecurityChecker;

    @SneakyThrows
    public boolean hasPermission(Authentication authentication, String mapName, Long viewId) {
        var jwt = (Jwt) authentication.getPrincipal();

        var level = jwt.getClaimAsString("level");
        var enterpriseId = getLongClaim(jwt, "enterpriseId");
        var departmentIds = getLongListClaim(jwt, "departmentIds");

        if (accessMapSecurityChecker.checkAccess(jwt, mapName)) {

            if (level.equals(DEPARTMENT)) {
                return workScheduleViewRepository.getById(viewId)
                        .map(view -> departmentIds.stream()
                                .anyMatch(accDepartmentId -> accDepartmentId.equals(view.getDepartmentId())))
                        .orElse(false);
            }

            if (level.equals(ENTERPRISE)) {
                return workScheduleViewRepository.getById(viewId)
                        .map(view -> enterpriseId.equals(view.getEnterpriseId()))
                        .orElse(false);
            }

        }

        return false;
    }
}
