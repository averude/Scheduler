package com.averude.uksatse.scheduler.core.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Objects;
import java.util.Set;
import java.util.StringJoiner;

@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "users_unique_constraint",
                        columnNames = {"username"}
                )
        }
)
public class User implements HasId {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private String username;

//    @JsonIgnore
    private String password;

    @NotNull
    @Column(name = "first_name")
    private String firstName;

    @NotNull
    @Column(name = "second_name")
    private String secondName;

    @Column(name = "department_id")
    private Long departmentId;

    @Column(name = "shift_id")
    private Long shiftId;

    @Column(name = "employee_id")
    private Long employeeId;

    private boolean locked = false;

    private boolean enabled = true;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE})
    @JoinTable(name = "users_authorities",
            joinColumns = @JoinColumn(
                    name = "user_id"
            ), inverseJoinColumns = @JoinColumn(
                    name = "authority_id"
    ))
    private Set<Authority> authorities = new HashSet<>();

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getSecondName() {
        return secondName;
    }

    public void setSecondName(String secondName) {
        this.secondName = secondName;
    }

    public Long getDepartmentId() {
        return departmentId;
    }

    public void setDepartmentId(Long departmentId) {
        this.departmentId = departmentId;
    }

    public Long getShiftId() {
        return shiftId;
    }

    public void setShiftId(Long shiftId) {
        this.shiftId = shiftId;
    }

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public boolean isLocked() {
        return locked;
    }

    public void setLocked(boolean locked) {
        this.locked = locked;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public Set<Authority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    public void addAuthority(Authority authority) {
        authorities.add(authority);
        authority.getUsers().add(this);
    }

    public void removeAuthority(Authority authority) {
        authorities.remove(authority);
        authority.getUsers().remove(this);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return locked == user.locked &&
                enabled == user.enabled &&
                username.equals(user.username) &&
                password.equals(user.password) &&
                Objects.equals(firstName, user.firstName) &&
                Objects.equals(secondName, user.secondName) &&
                Objects.equals(departmentId, user.departmentId) &&
                Objects.equals(shiftId, user.shiftId) &&
                Objects.equals(employeeId, user.employeeId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(username, password, firstName, secondName, departmentId, shiftId, employeeId, locked, enabled);
    }

    @Override
    public String toString() {
        return new StringJoiner(", ", User.class.getSimpleName() + "{", "}")
                .add("id=" + id)
                .add("username='" + username + "'")
                .add("password='" + password + "'")
                .add("firstName='" + firstName + "'")
                .add("secondName='" + secondName + "'")
                .add("departmentId=" + departmentId)
                .add("shiftId=" + shiftId)
                .add("employeeId=" + employeeId)
                .add("locked=" + locked)
                .add("enabled=" + enabled)
                .toString();
    }
}
