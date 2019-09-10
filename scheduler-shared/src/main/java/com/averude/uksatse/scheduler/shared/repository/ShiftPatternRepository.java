package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShiftPatternRepository extends JpaRepository<ShiftPattern, Long> {
    List<ShiftPattern> findAllByDepartmentId(long departmentId);
}
