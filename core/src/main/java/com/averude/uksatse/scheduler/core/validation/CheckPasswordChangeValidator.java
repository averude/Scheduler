package com.averude.uksatse.scheduler.core.validation;

import com.averude.uksatse.scheduler.core.interfaces.dto.PasswordChange;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CheckPasswordChangeValidator implements ConstraintValidator<CheckPasswordChange, PasswordChange> {
    @Override
    public boolean isValid(PasswordChange passwordChange,
                           ConstraintValidatorContext constraintValidatorContext) {
        return !passwordChange.getOldPassword().equals(passwordChange.getNewPassword());
    }
}
