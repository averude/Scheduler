package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.enterprise.entity.Enterprise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

public interface EnterpriseRepository extends JpaRepository<Enterprise, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select d.id " +
            "from Enterprise as e " +
            "left join Department as d " +
            "on e.id = d.enterpriseId " +
            "where e.id=?1")
    List<Long> getAllDepartmentIdsById(Long id);
}
