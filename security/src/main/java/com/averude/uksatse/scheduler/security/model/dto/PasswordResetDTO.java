package com.averude.uksatse.scheduler.security.model.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class PasswordResetDTO {
    private final String newPassword;
    private final String confirmPassword;
}
