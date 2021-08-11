package com.averude.uksatse.scheduler.security.controller.base;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static com.averude.uksatse.scheduler.core.util.CollectionUtils.containsAllLong;
import static com.averude.uksatse.scheduler.security.details.UserLevels.*;
import static com.averude.uksatse.scheduler.security.utils.SecurityUtils.getLongClaim;
import static com.averude.uksatse.scheduler.security.utils.SecurityUtils.getLongListClaim;
import static java.util.stream.Collectors.toList;

@Slf4j
@Component
@RequiredArgsConstructor
public class DepartmentLevelSecurity {

    private final DepartmentRepository      departmentRepository;
    private final AccessMapSecurityChecker  accessMapSecurityChecker;

    public boolean hasShiftsPermission(Authentication authentication,
                                       String mapName,
                                       List<Long> shiftIds) {
        var jwt = (Jwt) authentication.getPrincipal();
        var grantedShiftIds = getLongListClaim(jwt, "shiftIds");

        return accessMapSecurityChecker.checkAccess(jwt, mapName) && containsAllLong(shiftIds, grantedShiftIds);
    }

    public boolean hasPermission(Authentication authentication,
                                 String mapName,
                                 Long departmentId) {
        if (accessMapSecurityChecker.isInvalid(authentication, mapName, departmentId)) {
            return false;
        }

        var jwt = (Jwt) authentication.getPrincipal();

        return accessMapSecurityChecker.checkAccess(jwt, mapName) && checkDepartmentId(jwt, departmentId);
    }

    public boolean hasPermission(Authentication authentication,
                                 String mapName,
                                 HasDepartmentId hasDepartmentId) {
        if (hasDepartmentId == null) {
            return false;
        }

        return hasPermission(authentication, mapName, hasDepartmentId.getDepartmentId());
    }

    public boolean hasPermission(Authentication authentication,
                                 String mapName,
                                 Collection<? extends HasDepartmentId> collection) {
        var departmentIds = collection.stream().map(HasDepartmentId::getDepartmentId)
                .distinct()
                .collect(toList());

        return hasDepPermission(authentication, mapName, departmentIds);
    }

    public boolean hasPermission(Authentication authentication,
                                 String mapName,
                                 Optional<? extends HasDepartmentId> optional) {
        if (optional.isEmpty()) {
            return false;
        }

        return hasPermission(authentication, mapName, optional.get());

    }

    public boolean hasDepPermission(Authentication authentication,
                                    String mapName,
                                    List<Long> departmentIds) {
        var jwt = (Jwt) authentication.getPrincipal();

        return accessMapSecurityChecker.checkAccess(jwt, mapName) && departmentIds.stream()
                .allMatch(departmentId -> checkDepartmentId(jwt, departmentId));
    }

    private boolean checkDepartmentId(Jwt jwt, Long departmentId) {
        var level = jwt.getClaimAsString("level");
        var enterpriseId = getLongClaim(jwt, "enterpriseId");
        var departmentIds = getLongListClaim(jwt, "departmentIds");

        if (level.equals(DEPARTMENT) || level.equals(SHIFT)) {
            return departmentIds.stream()
                    .anyMatch(accDep -> accDep.equals(departmentId));
        }

        if (level.equals(ENTERPRISE)) {
            return departmentRepository.existsByEnterpriseIdAndId(enterpriseId, departmentId);
        }

        log.error("No required level found during check");
        return false;
    }
}
