package com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.SpecialCalendarDateRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.service.AService;
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
    @Transactional(readOnly = true)
    public List<SpecialCalendarDate> findAllByEnterpriseIdAndDateBetween(Long enterpriseId, LocalDate from, LocalDate to) {
        return specialCalendarDateRepository.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
    }
}
