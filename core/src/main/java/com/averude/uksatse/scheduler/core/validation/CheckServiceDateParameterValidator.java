package com.averude.uksatse.scheduler.core.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.constraintvalidation.SupportedValidationTarget;
import javax.validation.constraintvalidation.ValidationTarget;
import java.time.LocalDate;

@SupportedValidationTarget(ValidationTarget.PARAMETERS)
public class CheckServiceDateParameterValidator implements ConstraintValidator<CheckDateParameters, Object[]> {
    
    @Override
    public boolean isValid(Object[] value, ConstraintValidatorContext context) {
        if (value.length != 3) {
            throw new IllegalArgumentException( "Illegal method signature" );
        }

        //leave null-checking to @NotNull on individual parameters
        if (value[1] == null || value[2] == null) {
            return true;
        }

        if ( !( value[1] instanceof LocalDate ) || !( value[2] instanceof LocalDate ) ) {
            throw new IllegalArgumentException(
                    "Illegal method signature, expected two " +
                            "parameters of type LocalDate."
            );
        }

        return ((LocalDate) value[1]).isBefore((LocalDate) value[2]);
    }
}
