package com.averude.uksatse.scheduler.microservice.workschedule.repository;

import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.microservice.workschedule.repository.interfaces.IByEnterpriseIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;
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
}
