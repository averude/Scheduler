package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdAndDateRepository;
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
}
