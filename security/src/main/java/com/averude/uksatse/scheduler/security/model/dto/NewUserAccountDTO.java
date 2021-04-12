package com.averude.uksatse.scheduler.security.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.StringJoiner;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NewUserAccountDTO implements AccountDTO {

    @NotNull
    private String username;

    private String name;

    @NotNull
    private String password;

    @NotNull
    private String role;

    @NotNull
    private String authority;

    private Long enterpriseId;

    private List<Long> departmentIds;

    private List<Long> shiftIds;

    @Override
    public String toString() {
        return new StringJoiner(", ", NewUserAccountDTO.class.getSimpleName() + "[", "]")
                .add("username='" + username + "'")
                .add("name='" + name + "'")
                .add("role='" + role + "'")
                .add("authority='" + authority + "'")
                .add("enterpriseId=" + enterpriseId)
                .add("departmentIds=" + departmentIds)
                .add("shiftIds=" + shiftIds)
                .toString();
    }
}
