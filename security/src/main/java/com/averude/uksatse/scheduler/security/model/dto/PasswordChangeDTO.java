package com.averude.uksatse.scheduler.security.model.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.validation.constraints.NotNull;

@Data
@RequiredArgsConstructor
public class PasswordChangeDTO {
    @NotNull
    private final String oldPassword;
    @NotNull
    private final String newPassword;
    @NotNull
    private final String confirmPassword;
}
