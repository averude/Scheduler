package com.averude.uksatse.scheduler.security.model.dto;

import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountDepartment;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

import static java.util.stream.Collectors.toList;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountDTO implements AccountDTO {
    @NotNull
    private Long id;

    @NotNull
    private String username;

    private String name;

    @NotNull
    private String authority;

    @NotNull
    private String role;

    private Long enterpriseId;

    private List<Long> departmentIds;

    private List<Long> shiftIds;

    public UserAccountDTO(UserAccount userAccount) {
        Objects.requireNonNull(userAccount);

        this.id = userAccount.getId();
        this.username = userAccount.getUsername();
        this.name = userAccount.getName();
        this.authority = userAccount.getAuthority();
        this.role= userAccount.getRole();
        this.enterpriseId = userAccount.getEnterpriseId();

        if (userAccount.getAccountDepartments() != null) {
            this.departmentIds = getDepartmentIds(userAccount.getAccountDepartments());
        }
        if (userAccount.getAccountShifts() != null) {
            this.shiftIds = getShiftIds(userAccount.getAccountShifts());
        }
    }

    private List<Long> getDepartmentIds(List<UserAccountDepartment> accountDepartments) {
        return accountDepartments
                .stream()
                .map(UserAccountDepartment::getDepartmentId)
                .collect(toList());
    }

    private List<Long> getShiftIds(List<UserAccountShift> accountShifts) {
        return accountShifts
                .stream()
                .map(UserAccountShift::getShiftId)
                .collect(toList());
    }
}
