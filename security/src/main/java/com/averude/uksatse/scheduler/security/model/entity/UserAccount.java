package com.averude.uksatse.scheduler.security.model.entity;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.security.model.dto.NewUserAccountDTO;
import com.averude.uksatse.scheduler.security.model.dto.UserAccountDTO;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity(name = "user_accounts")
@NamedEntityGraph(
        name = "graph.UserAccount.accountShifts",
        attributeNodes = {
                @NamedAttributeNode("accountDepartments"),
                @NamedAttributeNode("accountShifts")
        }
)
public class UserAccount implements HasId {
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
    private String level;

    @NotNull
    private String role;

    private String name;

    @Column(name = "enterprise_id")
    private Long enterpriseId;

    // https://www.baeldung.com/java-hibernate-multiplebagfetchexception
    // https://vladmihalcea.com/hibernate-multiplebagfetchexception/
    // https://thorben-janssen.com/hibernate-tips-how-to-avoid-hibernates-multiplebagfetchexception/
    @OneToMany( cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            fetch = FetchType.LAZY,
            mappedBy = "userAccountId")
    private Set<UserAccountDepartment> accountDepartments;

    @OneToMany( cascade = {CascadeType.PERSIST, CascadeType.MERGE},
            fetch = FetchType.LAZY,
            mappedBy = "userAccountId")
    private List<UserAccountShift> accountShifts;

    public UserAccount(NewUserAccountDTO accountDTO) {
        this.username = accountDTO.getUsername().toLowerCase();
        this.level = accountDTO.getLevel();
        this.role = accountDTO.getRole();
        this.name = accountDTO.getName();
        this.enterpriseId = accountDTO.getEnterpriseId();
    }

    public void refreshFields(UserAccountDTO accountDTO) {
        this.setUsername(accountDTO.getUsername().toLowerCase());
        this.setName(accountDTO.getName());
        this.setRole(accountDTO.getRole());
    }
}
