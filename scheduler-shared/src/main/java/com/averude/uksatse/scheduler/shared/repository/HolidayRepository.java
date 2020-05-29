package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByEnterpriseIdAndDateRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface HolidayRepository extends IByEnterpriseIdAndDateRepository<Holiday, Long> {
    Optional<Holiday> findByDate(LocalDate date);
}
