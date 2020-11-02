package com.averude.uksatse.scheduler.security.entity;

import lombok.Data;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.StringJoiner;

@Data
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
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

    @Override
    public String toString() {
        return new StringJoiner(", ", UserAccount.class.getSimpleName() + "[", "]")
                .add("username='" + username + "'")
                .toString();
    }
}

