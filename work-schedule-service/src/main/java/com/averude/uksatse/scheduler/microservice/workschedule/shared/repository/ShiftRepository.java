package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    List<Shift> findAllByDepartmentId(Long departmentId);
    List<Shift> findAllByDepartmentIdInOrderByDepartmentIdAsc(List<Long> departmentIds);
}
