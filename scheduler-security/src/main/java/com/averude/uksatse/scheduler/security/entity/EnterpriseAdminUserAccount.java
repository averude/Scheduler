package com.averude.uksatse.scheduler.security.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Data
@Entity
@Table(name = "enterprise_admin_user_accounts")
public class EnterpriseAdminUserAccount extends UserAccount {
    @Column(name = "enterprise_id")
    private Long enterpriseId;
}
