package com.averude.uksatse.scheduler.core.validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ TYPE, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = { CheckNewPasswordValidator.class })
@Documented
public @interface CheckNewPassword {
    String message() default "New password isn't equal to confirmation password";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
