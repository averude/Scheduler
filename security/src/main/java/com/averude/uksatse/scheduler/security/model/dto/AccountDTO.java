package com.averude.uksatse.scheduler.security.model.dto;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountDepartment;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
import static java.util.stream.Collectors.toSet;

public interface AccountDTO extends HasEnterpriseId {
    String getLevel();
    String getRole();

    List<Long> getDepartmentIds();
    List<Long> getShiftIds();

    default List<UserAccountShift> getAccountShifts(Long userAccountId) {
        var shiftIds = getShiftIds();
        if (shiftIds == null) {
            return Collections.emptyList();
        }

        return shiftIds.stream()
                .map(shiftId -> new UserAccountShift(userAccountId, shiftId))
                .collect(toList());
    }

    default Set<UserAccountDepartment> getAccountDepartments(Long userAccountId) {
        var departmentIds = getDepartmentIds();
        if (departmentIds == null) {
            return Collections.emptySet();
        }

        return departmentIds.stream()
                .map(departmentId -> new UserAccountDepartment(userAccountId, departmentId))
                .collect(toSet());
    }

    static List<UserAccountDTO> convertToDTO(List<UserAccount> userAccounts) {
        return userAccounts
                .stream()
                .map(UserAccountDTO::new)
                .collect(Collectors.toList());
    }
}
