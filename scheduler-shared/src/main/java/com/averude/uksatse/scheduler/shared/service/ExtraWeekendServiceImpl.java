package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.shared.creator.ExtraDayCreator;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.ExtraWeekendRepository;
import com.averude.uksatse.scheduler.shared.repository.ExtraWorkDayRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByEnterpriseIdAndDateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class ExtraWeekendServiceImpl
        extends AByEnterpriseIdAndDateService<ExtraWeekend, Long> implements ExtraWeekendService {

    private static final Logger logger = LoggerFactory.getLogger(ExtraWeekendService.class);

    private final ExtraWeekendRepository    extraWeekendRepository;
    private final ExtraWorkDayRepository    extraWorkDayRepository;
    private final ExtraDayCreator extraDayCreator;

    @Autowired
    public ExtraWeekendServiceImpl(ExtraWeekendRepository extraWeekendRepository,
                                   ExtraWorkDayRepository extraWorkDayRepository,
                                   DepartmentRepository departmentRepository,
                                   ShiftRepository shiftRepository,
                                   ExtraDayCreator extraDayCreator) {
        super(extraWeekendRepository, departmentRepository, shiftRepository);
        this.extraWeekendRepository = extraWeekendRepository;
        this.extraWorkDayRepository = extraWorkDayRepository;
        this.extraDayCreator = extraDayCreator;
    }

    @Override
    @Transactional
    public ExtraWorkDay transferWorkDay(ExtraWeekend extraWeekend, LocalDate date) {
        logger.debug("Transferring work day from {} to {}", extraWeekend.getDate(), date);
        var extraWorkDay = extraDayCreator.createExtraWorkDay(extraWeekend, date);
        extraWeekendRepository.save(extraWeekend);
        logger.debug("Extra weekend {} created", extraWeekend);
        extraWorkDayRepository.save(extraWorkDay);
        logger.debug("Extra work day {} created", extraWorkDay);
        return extraWorkDay;
    }
}
