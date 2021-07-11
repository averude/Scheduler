package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

public interface DayTypeRepository extends IByEnterpriseIdRepository<DayType, Long> {
    @Override
    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph(value = "graph.DayType.dayTypeGroup")
    List<DayType> findAllByEnterpriseId(Long enterpriseId);
}
