package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Department;
import org.springframework.security.core.Authentication;

import java.util.Optional;

public interface DepartmentService extends GenericService<Department, Long>{
    Optional<Department> getCurrent(Authentication authentication);
}
