package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.shared.extradays.ExtraDayGenerator;
import com.averude.uksatse.scheduler.shared.repository.ExtraWeekendRepository;
import com.averude.uksatse.scheduler.shared.repository.ExtraWorkDayRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExtraWeekendServiceImpl extends AbstractService<ExtraWeekend, Long>
        implements ExtraWeekendService {

    private static final Logger logger = LoggerFactory.getLogger(ExtraWeekendService.class);

    private final ShiftRepository shiftRepository;
    private final ExtraWeekendRepository extraWeekendRepository;
    private final ExtraWorkDayRepository extraWorkDayRepository;
    private final ExtraDayGenerator extraDayGenerator;

    @Autowired
    public ExtraWeekendServiceImpl(ShiftRepository shiftRepository,
                                   ExtraWeekendRepository extraWeekendRepository,
                                   ExtraWorkDayRepository extraWorkDayRepository,
                                   ExtraDayGenerator extraDayGenerator) {
        super(extraWeekendRepository);
        this.shiftRepository = shiftRepository;
        this.extraWeekendRepository = extraWeekendRepository;
        this.extraWorkDayRepository = extraWorkDayRepository;
        this.extraDayGenerator = extraDayGenerator;
    }

    @Override
    @Transactional
    public List<ExtraWeekend> findAllByDepartmentId(Long departmentId) {
        return extraWeekendRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<ExtraWeekend> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                  LocalDate from,
                                                                  LocalDate to) {
        return extraWeekendRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<ExtraWeekend> findAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to))
                .orElse(null);
    }

    @Override
    @Transactional
    public ExtraWorkDay transferWorkDay(ExtraWeekend extraWeekend, LocalDate date) {
        logger.debug("Transferring work day from {} to {}", extraWeekend.getDate(), date);
        var extraWorkDay = extraDayGenerator.createExtraWorkDay(extraWeekend, date);
        extraWeekendRepository.save(extraWeekend);
        logger.debug("Extra weekend {} created", extraWeekend);
        extraWorkDayRepository.save(extraWorkDay);
        logger.debug("Extra work day {} created", extraWorkDay);
        return extraWorkDay;
    }
}
