package com.averude.uksatse.scheduler.microservice.workschedule.repository;

import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdAndDateRepository;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.time.LocalDate;
import java.util.List;

public interface SpecialCalendarDateRepository extends IByEnterpriseIdAndDateRepository<SpecialCalendarDate, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select scd " +
            "from SpecialCalendarDate as scd " +
            "inner join Department as d " +
            "on scd.enterpriseId = d.enterpriseId " +
            "where d.id = ?1 and scd.date between ?2 and ?3 " +
            "order by scd.date")
    List<SpecialCalendarDate> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                  LocalDate from,
                                                                  LocalDate to);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Query("select scd " +
            "from SpecialCalendarDate as scd " +
            "inner join Department as d " +
            "on scd.enterpriseId = d.enterpriseId " +
            "inner join Shift as s " +
            "on d.id = s.departmentId " +
            "where s.id = ?1 and scd.date between ?2 and ?3 " +
            "order by scd.date")
    List<SpecialCalendarDate> findAllByShiftIdAndDateBetween(Long shiftId,
                                                             LocalDate from,
                                                             LocalDate to);

    @Override
    @Cacheable(value = "enterprise_special_calendar_dates", key = "{#enterpriseId, #from, #to}")
    List<SpecialCalendarDate> findAllByEnterpriseIdAndDateBetween(Long enterpriseId, LocalDate from, LocalDate to);

    @Override
    @CacheEvict(value = "enterprise_special_calendar_dates", allEntries = true)
    <S extends SpecialCalendarDate> S save(S entity);

    @Override
    @CacheEvict(value = "enterprise_special_calendar_dates", allEntries = true)
    void delete(SpecialCalendarDate entity);
}
