package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdAndDateRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface ExtraWeekendRepository extends IByEnterpriseIdAndDateRepository<ExtraWeekend, Long> {
    Optional<ExtraWeekend> findByHolidayId(Long holidayId);
    Optional<ExtraWeekend> findByDateAndEnterpriseId(LocalDate date, Long enterpriseId);
}
