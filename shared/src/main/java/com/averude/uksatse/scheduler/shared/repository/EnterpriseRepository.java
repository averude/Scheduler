package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.structure.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {

    @Query("select d.id " +
            "from Enterprise as e " +
            "left join Department as d " +
            "on e.id = d.enterpriseId " +
            "where e.id=?1")
    List<Long> getAllDepartmentIdsById(Long id);
}
