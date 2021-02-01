package com.averude.uksatse.scheduler.core.validation;

import com.averude.uksatse.scheduler.core.interfaces.dto.HasNewPassword;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class CheckNewPasswordValidator implements ConstraintValidator<CheckNewPassword, HasNewPassword> {
    @Override
    public boolean isValid(HasNewPassword hasNewPassword,
                           ConstraintValidatorContext constraintValidatorContext) {
        return hasNewPassword.getNewPassword().equals(hasNewPassword.getConfirmPassword());
    }
}
