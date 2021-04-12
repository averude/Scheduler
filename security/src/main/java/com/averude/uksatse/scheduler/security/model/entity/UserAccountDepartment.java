package com.averude.uksatse.scheduler.security.model.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity(name = "user_accounts_departments")
@IdClass(UserAccountDepartment.PK.class)
public class UserAccountDepartment implements HasDepartmentId {

    @Id
    @Column(name = "user_account_id")
    private Long userAccountId;

    @Id
    @Column(name = "department_id")
    private Long departmentId;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PK implements Serializable {
        private Long userAccountId;
        private Long departmentId;
    }
}
