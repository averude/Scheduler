package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.shared.repository.ExtraWeekendRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExtraWeekendServiceImpl extends AbstractService<ExtraWeekend, Long>
        implements ExtraWeekendService {

    private final ShiftRepository shiftRepository;
    private final ExtraWeekendRepository extraWeekendRepository;

    @Autowired
    public ExtraWeekendServiceImpl(ShiftRepository shiftRepository,
                                   ExtraWeekendRepository extraWeekendRepository) {
        super(extraWeekendRepository);
        this.shiftRepository = shiftRepository;
        this.extraWeekendRepository = extraWeekendRepository;
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
}
