package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.shared.repository.SpecialCalendarDateRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class SpecialCalendarDateServiceImpl
        extends AService<SpecialCalendarDate, Long>
        implements SpecialCalendarDateService {

    private final SpecialCalendarDateRepository specialCalendarDateRepository;

    public SpecialCalendarDateServiceImpl(SpecialCalendarDateRepository specialCalendarDateRepository) {
        super(specialCalendarDateRepository);
        this.specialCalendarDateRepository = specialCalendarDateRepository;
    }

    @Override
    @Transactional
    public List<SpecialCalendarDate> findAllByEnterpriseIdAndDateBetween(Long enterpriseId, LocalDate from, LocalDate to) {
        return specialCalendarDateRepository.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
    }
}
