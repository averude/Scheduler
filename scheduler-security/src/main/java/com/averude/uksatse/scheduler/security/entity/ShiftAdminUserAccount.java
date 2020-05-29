package com.averude.uksatse.scheduler.security.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Data
@Entity
@Table(name = "shift_admin_user_accounts")
public class ShiftAdminUserAccount extends UserAccount {
    @NotNull
    @Column(name = "shift_id")
    private Long shiftId;
}
