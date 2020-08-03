package com.averude.uksatse.scheduler.security.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import java.util.StringJoiner;

@Data
@Entity
@Table(name = "shift_admin_user_accounts")
public class ShiftAdminUserAccount extends UserAccount {
    @NotNull
    @Column(name = "shift_id")
    private Long shiftId;

    @Override
    public String toString() {
        return new StringJoiner(", ", ShiftAdminUserAccount.class.getSimpleName() + "[", "]")
                .add("username=" + super.getUsername())
                .add("shiftId=" + shiftId)
                .toString();
    }
}
