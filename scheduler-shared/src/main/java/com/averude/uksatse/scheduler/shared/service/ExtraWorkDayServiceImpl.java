package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
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
public class ExtraWorkDayServiceImpl
        extends AbstractService<ExtraWorkDay, Long> implements ExtraWorkDayService {

    private static final Logger logger = LoggerFactory.getLogger(ExtraWorkDayService.class);

    private final ShiftRepository shiftRepository;
    private final ExtraWorkDayRepository extraWorkDayRepository;

    @Autowired
    public ExtraWorkDayServiceImpl(ShiftRepository shiftRepository,
                                   ExtraWorkDayRepository extraWorkDayRepository) {
        super(extraWorkDayRepository);
        this.shiftRepository = shiftRepository;
        this.extraWorkDayRepository = extraWorkDayRepository;
    }

    @Override
    @Transactional
    public List<ExtraWorkDay> findAllByDepartmentId(Long departmentId, LocalDate from, LocalDate to) {
        return extraWorkDayRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<ExtraWorkDay> findAllByShiftId(Long shiftId, LocalDate from, LocalDate to) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentId(shift.getDepartmentId(), from, to))
                .orElse(null);
    }
}
