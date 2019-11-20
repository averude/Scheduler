package com.averude.uksatse.scheduler.core.annotation;

import org.springframework.security.access.prepost.PreAuthorize;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@PreAuthorize("hasRole('SHIFT_ADMIN') && #shiftId == authentication.principal.shiftId")
public @interface ShiftAdminPermission {
}
