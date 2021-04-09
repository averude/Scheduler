package com.averude.uksatse.scheduler.security.model.dto;

import com.averude.uksatse.scheduler.security.model.IUser;
import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserAccountDTO implements IUser {
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

    private Long departmentId;

    private List<Long> shiftIds;

    public UserAccountDTO(UserAccount userAccount) {
        Objects.requireNonNull(userAccount);

        this.id = userAccount.getId();
        this.username = userAccount.getUsername();
        this.name = userAccount.getName();
        this.authority = userAccount.getAuthority();
        this.role= userAccount.getRole();
        this.enterpriseId = userAccount.getEnterpriseId();
        this.departmentId = userAccount.getDepartmentId();
        if (userAccount.getAccountShifts() != null) {
            this.shiftIds = getShiftIds(userAccount.getAccountShifts());
        }
    }

    public UserAccountDTO(UserAccount userAccount, List<Long> shiftIds) {
        Objects.requireNonNull(userAccount);

        this.id = userAccount.getId();
        this.username = userAccount.getUsername();
        this.name = userAccount.getName();
        this.authority = userAccount.getAuthority();
        this.role= userAccount.getRole();
        this.enterpriseId = userAccount.getEnterpriseId();
        this.departmentId = userAccount.getDepartmentId();
        this.shiftIds = shiftIds;
    }

    private List<Long> getShiftIds(List<UserAccountShift> accountShifts) {
        return accountShifts
                .stream()
                .map(UserAccountShift::getShiftId)
                .collect(Collectors.toList());
    }
}
