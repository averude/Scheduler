package com.averude.uksatse.scheduler.security.model.dto;

import com.averude.uksatse.scheduler.core.interfaces.dto.HasNewPassword;
import com.averude.uksatse.scheduler.core.validation.CheckNewPassword;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@CheckNewPassword
public class PasswordResetDTO implements HasNewPassword {

    @NotNull
    @Size(min = 6, max = 64)
    private String newPassword;

    @NotNull
    @Size(min = 6, max = 64)
    private String confirmPassword;

    public PasswordResetDTO(String newPassword,
                            String confirmPassword) {
        this.newPassword = newPassword;
        this.confirmPassword = confirmPassword;
    }
}
