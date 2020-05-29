package com.averude.uksatse.scheduler.security.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "global_admin_user_accounts")
public class GlobalAdminUserAccount extends UserAccount {
    @Column(name = "is_global_admin")
    private Boolean isGlobalAdmin;
}
