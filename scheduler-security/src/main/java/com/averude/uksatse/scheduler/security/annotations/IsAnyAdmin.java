package com.averude.uksatse.scheduler.security.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasAnyAuthority('GLOBAL_ADMIN', 'ENTERPRISE_ADMIN', " +
        "'DEPARTMENT_ADMIN', 'SHIFT_ADMIN') and hasRole('ADMIN')")
public @interface IsAnyAdmin {
}
