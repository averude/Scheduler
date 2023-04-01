package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.time.LocalDate;
import java.util.List;

public interface SpecialCalendarDateRepository extends JpaRepository<SpecialCalendarDate, Long> {

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @Cacheable(value = "enterprise_special_calendar_dates", key = "{#enterpriseId, #from, #to}")
    List<SpecialCalendarDate> findAllByEnterpriseIdAndDateBetween(Long enterpriseId, LocalDate from, LocalDate to);

    @Override
    @CacheEvict(value = "enterprise_special_calendar_dates", allEntries = true)
    <S extends SpecialCalendarDate> S save(S entity);

    @Override
    @CacheEvict(value = "enterprise_special_calendar_dates", allEntries = true)
    void delete(SpecialCalendarDate entity);
}
