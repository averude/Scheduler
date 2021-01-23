package com.averude.uksatse.scheduler.security.model.entity;

import lombok.Data;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;
import java.util.StringJoiner;

@Data
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Entity(name = "user_accounts")
@NamedEntityGraph(
        name = "graph.UserAccount.accountShifts",
        attributeNodes = @NamedAttributeNode("accountShifts")
)
public class UserAccount implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private String authority;

    @NotNull
    private String role;

    @Column(name = "enterprise_id")
    private Long enterpriseId;

    @Column(name = "department_id")
    private Long departmentId;

//    @JsonIgnore
    @OneToMany( cascade = {CascadeType.ALL},
                fetch = FetchType.LAZY,
                orphanRemoval = true,
                mappedBy = "userAccountId")
    private List<UserAccountShift> accountShifts;

    private String name;

    @NotNull
    private boolean locked = false;
    @NotNull
    private boolean enabled = true;

    @Override
    public String toString() {
        return new StringJoiner(", ", UserAccount.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("username='" + username + "'")
                .add("authority='" + authority + "'")
                .toString();
    }
}

