package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Shift;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface ShiftService extends GenericService<Shift, Long> {
    List<Shift> findAllByDepartmentId(Long departmentId);
    List<Shift> findAllByShiftId(Long shiftId);

    List<Shift> findAllByAuth(Authentication authentication);
}
