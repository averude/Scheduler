package validation;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({ METHOD, CONSTRUCTOR, ANNOTATION_TYPE })
@Retention(RUNTIME)
@Constraint(validatedBy = CheckServiceDateParameterValidator.class)
@Documented
public @interface CheckDateParameters {
    String message() default "{workDay.date.chronology}";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
