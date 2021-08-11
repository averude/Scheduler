package com.averude.uksatse.scheduler.security.model.dto;

import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.utils.SecurityUtils;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;

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
    private String level;

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
        this.level = userAccount.getLevel();
        this.role = userAccount.getRole();
        this.enterpriseId = userAccount.getEnterpriseId();

        if (userAccount.getAccountDepartments() != null) {
            this.departmentIds = SecurityUtils.getDepartmentIds(userAccount.getAccountDepartments());
        }
        if (userAccount.getAccountShifts() != null) {
            this.shiftIds = SecurityUtils.getShiftIds(userAccount.getAccountShifts());
        }
    }

}
