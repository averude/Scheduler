package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;

import java.util.List;

public interface ShiftRepository extends IByDepartmentIdRepository<Shift, Long> {
    List<Shift> findAllByDepartmentIdInOrderByDepartmentIdAsc(List<Long> departmentIds);
}
