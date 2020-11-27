package com.averude.uksatse.scheduler.security.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import java.util.StringJoiner;

@Data
@Entity
@Table(name = "department_admin_user_accounts")
public class DepartmentAdminUserAccount extends UserAccount {
    @Column(name = "department_id")
    private Long departmentId;

    @Override
    public String toString() {
        return new StringJoiner(", ", DepartmentAdminUserAccount.class.getSimpleName() + "[", "]")
                .add("username=" + super.getUsername())
                .add("departmentId=" + departmentId)
                .toString();
    }
}
