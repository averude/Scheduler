package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

public interface SummationColumnRepository
        extends IByEnterpriseIdRepository<SummationColumn, Long> {
    @Override
    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph(value = "graph.SummationColumn.dayTypeRanges")
    List<SummationColumn> findAllByEnterpriseId(Long enterpriseId);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select sc from SummationColumn as sc " +
            "left join fetch sc.dayTypeRanges " +
            "inner join Department as d " +
            "on sc.enterpriseId = d.enterpriseId " +
            "where d.id = ?1")
    List<SummationColumn> findAllByDepartmentId(Long departmentId);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select sc from SummationColumn as sc " +
            "left join fetch sc.dayTypeRanges " +
            "inner join Department as d " +
            "on sc.enterpriseId = d.enterpriseId " +
            "inner join Shift as s " +
            "on d.id = s.departmentId " +
            "where s.id = ?1")
    List<SummationColumn> findAllByShiftId(Long shiftId);
}
