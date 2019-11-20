package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.shared.repository.ShiftPatternRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShiftPatternServiceImpl
        extends AbstractService<ShiftPattern, Long> implements ShiftPatternService {

    private final ShiftRepository shiftRepository;
    private final ShiftPatternRepository shiftPatternRepository;

    @Autowired
    public ShiftPatternServiceImpl(ShiftRepository shiftRepository,
                                   ShiftPatternRepository shiftPatternRepository) {
        super(shiftPatternRepository);
        this.shiftRepository = shiftRepository;
        this.shiftPatternRepository = shiftPatternRepository;
    }

    @Override
    @Transactional
    public List<ShiftPattern> findAllByDepartmentId(long departmentId) {
        return shiftPatternRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<ShiftPattern> findAllByShiftId(Long shiftId) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentId(shift.getDepartmentId()))
                .orElse(null);
    }
}
