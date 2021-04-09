package com.averude.uksatse.scheduler.security.controller.base;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.util.CollectionUtils;
import com.averude.uksatse.scheduler.security.model.IUser;
import com.averude.uksatse.scheduler.shared.repository.common.DepartmentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import static com.averude.uksatse.scheduler.security.authority.Authorities.*;
import static com.averude.uksatse.scheduler.security.details.AccountUtils.getUserAccount;

@Slf4j
@Component
public class DepartmentLevelSecurity extends AbstractLevelSecurity {

    private final DepartmentRepository departmentRepository;

    public DepartmentLevelSecurity(HashMap<String, HashMap<String, List<String>>> accessMap,
                                   DepartmentRepository departmentRepository) {
        super(accessMap);
        this.departmentRepository = departmentRepository;
    }

    public boolean hasShiftsPermission(Authentication authentication,
                                       String mapName,
                                       List<Long> shiftIds) {
        var account = getUserAccount(authentication);
        var accountShifts = account.getAccountShifts();

        return checkAccess(account, mapName) &&
                CollectionUtils.containsAll(shiftIds, accountShifts,
                        (shiftId, userAccountShift) -> userAccountShift.getShiftId().equals(shiftId));
    }

    public boolean hasPermission(Authentication authentication,
                                 String mapName,
                                 Long departmentId) {
        if (isInvalid(authentication, mapName, departmentId)) {
            return false;
        }

        var user = getUserAccount(authentication);

        return checkAccess(user, mapName) && checkDepartmentId(user, departmentId);
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
        var user = getUserAccount(authentication);

        return checkAccess(user, mapName) && collection.stream().map(HasDepartmentId::getDepartmentId)
                .distinct()
                .allMatch(departmentId -> checkDepartmentId(user, departmentId));
    }

    public boolean hasPermission(Authentication authentication,
                                 String mapName,
                                 Optional<? extends HasDepartmentId> optional) {
        if (optional.isEmpty()) {
            return false;
        }

        return hasPermission(authentication, mapName, optional.get());

    }

    private boolean checkDepartmentId(IUser user, Long departmentId) {
        if (user.getAuthority().equals(DEPARTMENT_ADMIN)
                || user.getAuthority().equals(SHIFT_ADMIN)) {
            return user.getDepartmentId().equals(departmentId);
        }

        if (user.getAuthority().equals(ENTERPRISE_ADMIN)) {
            return departmentRepository.existsByEnterpriseIdAndId(user.getEnterpriseId(), departmentId);
        }

        log.error("No required authority found during check");
        return false;
    }
}
