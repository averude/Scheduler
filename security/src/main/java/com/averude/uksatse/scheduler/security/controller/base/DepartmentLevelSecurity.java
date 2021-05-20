package com.averude.uksatse.scheduler.security.controller.base;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasShiftId;
import com.averude.uksatse.scheduler.core.util.CollectionUtils;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.shared.repository.common.DepartmentRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import static com.averude.uksatse.scheduler.security.authority.Authorities.*;
import static com.averude.uksatse.scheduler.security.details.AccountUtils.getUserAccount;
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
        var account = getUserAccount(authentication);
        var accountShifts = account.getAccountShifts();

        return accessMapSecurityChecker.checkAccess(account, mapName) && containsShifts(shiftIds, accountShifts);
    }

    public boolean containsShifts(List<Long> shiftIds,
                                   Collection<? extends HasShiftId> hasShiftIds) {
        return CollectionUtils.containsAll(shiftIds, hasShiftIds,
                        (shiftId, hasShiftId) -> hasShiftId.getShiftId().equals(shiftId));
    }

    public boolean hasPermission(Authentication authentication,
                                 String mapName,
                                 Long departmentId) {
        if (accessMapSecurityChecker.isInvalid(authentication, mapName, departmentId)) {
            return false;
        }

        var account = getUserAccount(authentication);

        return accessMapSecurityChecker.checkAccess(account, mapName) && checkDepartmentId(account, departmentId);
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
        List<Long> departmentIds = collection.stream().map(HasDepartmentId::getDepartmentId)
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

    private boolean checkDepartmentId(UserAccount user, Long departmentId) {
        if (user.getAuthority().equals(DEPARTMENT_ADMIN)
                || user.getAuthority().equals(SHIFT_ADMIN)) {
            return user.getAccountDepartments().stream()
                    .anyMatch(accDep -> accDep.getDepartmentId().equals(departmentId));
        }

        if (user.getAuthority().equals(ENTERPRISE_ADMIN)) {
            return departmentRepository.existsByEnterpriseIdAndId(user.getEnterpriseId(), departmentId);
        }

        log.error("No required authority found during check");
        return false;
    }

    public boolean hasDepPermission(Authentication authentication,
                                    String mapName,
                                    List<Long> departmentIds) {

        var account = getUserAccount(authentication);

        return accessMapSecurityChecker.checkAccess(account, mapName) && departmentIds.stream()
                .allMatch(departmentId -> checkDepartmentId(account, departmentId));
    }
}
