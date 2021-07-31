package com.averude.uksatse.scheduler.security.annotations;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("@userRoleLevelChecker.checkAnyLevel('ENTERPRISE', 'DEPARTMENT') " +
        "and @userRoleLevelChecker.hasRole('ADMIN')")
public @interface IsEnterpriseOrDepartmentAdmin {
}
