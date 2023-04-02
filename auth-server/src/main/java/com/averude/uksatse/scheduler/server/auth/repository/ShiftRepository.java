package com.averude.uksatse.scheduler.server.auth.repository;

import com.averude.uksatse.scheduler.server.auth.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    List<Shift> findAllByDepartmentId(Long departmentId);
    List<Shift> findAllByDepartmentIdInOrderByDepartmentIdAsc(List<Long> departmentIds);
}
