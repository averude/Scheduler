package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.repository.WorkingTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class WorkingTimeServiceImpl extends AbstractService<WorkingTime, Long>
        implements WorkingTimeService {

    private final ShiftRepository shiftRepository;
    private final WorkingTimeRepository workingTimeRepository;

    @Autowired
    public WorkingTimeServiceImpl(ShiftRepository shiftRepository,
                                  WorkingTimeRepository workingTimeRepository) {
        super(workingTimeRepository);
        this.shiftRepository = shiftRepository;
        this.workingTimeRepository = workingTimeRepository;
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByDepartmentId(Long departmentId) {
        return workingTimeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                                 LocalDate from,
                                                                 LocalDate to) {
        return workingTimeRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<WorkingTime> findAllByShiftIdAndDateBetween(Long shiftId,
                                                            LocalDate from,
                                                            LocalDate to) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to))
                .orElse(null);
    }
}
