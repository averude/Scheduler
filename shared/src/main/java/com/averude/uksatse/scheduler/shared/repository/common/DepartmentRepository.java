package com.averude.uksatse.scheduler.shared.repository.common;

import com.averude.uksatse.scheduler.core.model.entity.structure.Department;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface DepartmentRepository extends IByEnterpriseIdRepository<Department, Long> {

    @Query("select dep " +
            "from Department as dep " +
            "inner join Shift as sh " +
            "on dep.id = sh.departmentId " +
            "where sh.id = :shiftId")
    Optional<Department> findByShiftId(@Param("shiftId") Long shiftId);

    boolean existsByEnterpriseIdAndId(Long enterpriseId, Long departmentId);
}
