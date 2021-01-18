package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SummationColumnDayTypeRangeRepository extends IByEnterpriseIdRepository<SummationColumnDayTypeRange, Long> {

    @Query("select sr " +
            "from SummationColumnDayTypeRange as sr " +
            "inner join DayType as dt " +
            "on sr.dayTypeId = dt.id " +
            "where dt.enterpriseId = ?1")
    List<SummationColumnDayTypeRange> findAllByEnterpriseId(Long enterpriseId);

    List<SummationColumnDayTypeRange> findAllBySummationColumnId(Long summationColumnId);

    void deleteAllBySummationColumnIdAndIdIsNotIn(Long summationColumnId, List<Long> ids);
}
