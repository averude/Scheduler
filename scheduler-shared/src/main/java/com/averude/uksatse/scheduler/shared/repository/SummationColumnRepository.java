package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.SummationColumn;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SummationColumnRepository
        extends IByEnterpriseIdRepository<SummationColumn, Long> {

    @Query("select sc from SummationColumn as sc " +
            "inner join Department as d " +
            "on sc.enterpriseId = d.enterpriseId " +
            "where d.id = ?1")
    List<SummationColumn> findAllByDepartmentId(Long departmentId);

    @Query("select sc from SummationColumn as sc " +
            "inner join Department as d " +
            "on sc.enterpriseId = d.enterpriseId " +
            "inner join Shift as s " +
            "on d.id = s.departmentId " +
            "where s.id = ?1")
    List<SummationColumn> findAllByShiftId(Long shiftId);
}
