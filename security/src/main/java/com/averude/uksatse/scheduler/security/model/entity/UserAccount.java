package com.averude.uksatse.scheduler.security.model.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.security.model.IUser;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.StringJoiner;

@Data
@NoArgsConstructor
@Cacheable
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@Entity(name = "user_accounts")
@NamedEntityGraph(
        name = "graph.UserAccount.accountShifts",
        attributeNodes = {
                @NamedAttributeNode("accountShifts")
        }
)
public class UserAccount implements HasId, IUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String username;

    @NotNull
    private String password;

    @NotNull
    private boolean locked = false;

    @NotNull
    private boolean enabled = true;

    @NotNull
    private String authority;

    @NotNull
    private String role;

    private String name;

    @Column(name = "enterprise_id")
    private Long enterpriseId;

    @Column(name = "department_id")
    private Long departmentId;

    @OneToMany( cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            fetch = FetchType.LAZY,
            mappedBy = "userAccountId")
    private List<UserAccountShift> accountShifts;

    public UserAccount(NewUserAccountDTO accountDTO) {
        this.username = accountDTO.getUsername().toLowerCase();
        this.authority = accountDTO.getAuthority();
        this.role = accountDTO.getRole();
        this.name = accountDTO.getName();
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", UserAccount.class.getSimpleName() + "[", "]")
                .add("id=" + id)
                .add("username='" + username + "'")
                .add("authority='" + authority + "'")
                .add("role='" + role + "'")
                .toString();
    }
}

