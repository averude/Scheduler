package com.averude.uksatse.scheduler.security.model.dto;

import com.averude.uksatse.scheduler.core.interfaces.dto.PasswordChange;
import com.averude.uksatse.scheduler.core.validation.CheckNewPassword;
import com.averude.uksatse.scheduler.core.validation.CheckPasswordChange;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Getter
@Setter
@CheckNewPassword
@CheckPasswordChange
public class PasswordChangeDTO extends PasswordResetDTO implements PasswordChange {

    @NotNull
    @Size(min = 6, max = 64)
    private String oldPassword;

    public PasswordChangeDTO(String oldPassword,
                             String newPassword,
                             String confirmPassword) {
        super(newPassword, confirmPassword);
        this.oldPassword = oldPassword;
    }

    @Override
    public String toString() {
        return "[PROTECTED]";
    }
}
