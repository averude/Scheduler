package com.averude.uksatse.scheduler.microservice.workschedule.repository;

import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

public interface SummationColumnDayTypeRangeRepository extends IByEnterpriseIdRepository<SummationColumnDayTypeRange, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select sr " +
            "from SummationColumnDayTypeRange as sr " +
            "inner join DayType as dt " +
            "on sr.dayTypeId = dt.id " +
            "where dt.enterpriseId = ?1")
    List<SummationColumnDayTypeRange> findAllByEnterpriseId(Long enterpriseId);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    List<SummationColumnDayTypeRange> findAllBySummationColumnId(Long summationColumnId);

    void deleteAllBySummationColumnIdAndIdIsNotIn(Long summationColumnId, List<Long> ids);
}
