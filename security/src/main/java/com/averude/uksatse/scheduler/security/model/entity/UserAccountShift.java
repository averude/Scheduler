package com.averude.uksatse.scheduler.security.model.entity;

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
@Entity(name = "user_accounts_shifts")
@IdClass(UserAccountShift.PK.class)
public class UserAccountShift implements Serializable {

    @Id
    @Column(name = "user_account_id")
    private Long userAccountId;

    @Id
    @Column(name = "shift_id")
    private Long shiftId;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class PK implements Serializable {
        private Long userAccountId;
        private Long shiftId;
    }
}


