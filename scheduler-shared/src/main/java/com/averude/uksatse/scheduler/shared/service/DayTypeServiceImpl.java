package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.shared.repository.DayTypeRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DayTypeServiceImpl
        extends AbstractService<DayType, Long> implements DayTypeService {

    private final ShiftRepository shiftRepository;
    private final DayTypeRepository dayTypeRepository;

    @Autowired
    public DayTypeServiceImpl(ShiftRepository shiftRepository,
                              DayTypeRepository dayTypeRepository) {
        super(dayTypeRepository);
        this.shiftRepository = shiftRepository;
        this.dayTypeRepository = dayTypeRepository;
    }

    @Override
    @Transactional
    public List<DayType> findAllByDepartmentId(Long departmentId) {
        return dayTypeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<DayType> findAllByShiftId(Long shiftId) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentId(shift.getDepartmentId()))
                .orElse(null);
    }
}
