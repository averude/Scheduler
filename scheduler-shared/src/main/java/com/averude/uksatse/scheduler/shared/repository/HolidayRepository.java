package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdAndDateRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface HolidayRepository extends IByEnterpriseIdAndDateRepository<Holiday, Long> {
    Optional<Holiday> findByDate(LocalDate date);

    @Query("select h " +
            "from Holiday as h " +
            "inner join Department as d " +
            "on h.enterpriseId = d.enterpriseId " +
            "where d.id = ?1 and h.date between ?2 and ?3")
    List<Holiday> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                      LocalDate from,
                                                      LocalDate to);
}
