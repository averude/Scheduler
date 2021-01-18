package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DayTypeRepository extends IByEnterpriseIdRepository<DayType, Long>,
        IByDepartmentIdRepository<DayType, Long> {
    @Override
    List<DayType> findAllByEnterpriseId(Long enterpriseId);

    @Override
    @Query("select dt " +
            "from DayType dt " +
            "left join fetch dt.dayTypeGroup " +
            "left join Department d " +
            "on dt.enterpriseId = d.enterpriseId " +
            "where d.id = ?1")
    List<DayType> findAllByDepartmentId(Long departmentId);
}
