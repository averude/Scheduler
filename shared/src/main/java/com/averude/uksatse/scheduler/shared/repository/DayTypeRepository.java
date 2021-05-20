package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.List;

public interface DayTypeRepository extends IByEnterpriseIdRepository<DayType, Long> {
    @Override
    @EntityGraph(value = "graph.DayType.dayTypeGroup")
    List<DayType> findAllByEnterpriseId(Long enterpriseId);
}
