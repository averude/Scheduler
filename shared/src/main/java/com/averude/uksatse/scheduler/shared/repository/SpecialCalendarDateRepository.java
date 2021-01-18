package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdAndDateRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SpecialCalendarDateRepository extends IByEnterpriseIdAndDateRepository<SpecialCalendarDate, Long> {
    Optional<SpecialCalendarDate> findByDate(LocalDate date);

    @Query("select scd " +
            "from SpecialCalendarDate as scd " +
            "inner join Department as d " +
            "on scd.enterpriseId = d.enterpriseId " +
            "where d.id = ?1 and scd.date between ?2 and ?3 " +
            "order by scd.date")
    List<SpecialCalendarDate> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                  LocalDate from,
                                                                  LocalDate to);

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
