package com.averude.uksatse.scheduler.security.entity;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Entity(name = "user_accounts")
@Inheritance(strategy = InheritanceType.JOINED)
public class UserAccount implements Serializable {
    @Id
    private String username;
    @NotNull
    private String password;
    @NotNull
    private boolean locked = false;
    @NotNull
    private boolean enabled = true;
}

