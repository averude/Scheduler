package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.shared.repository.DepartmentDayTypeRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentDayTypeServiceImpl
        extends AbstractService<DepartmentDayType, Long> implements DepartmentDayTypeService {

    private final DepartmentDayTypeRepository departmentDayTypeRepository;
    private final ShiftRepository shiftRepository;

    @Autowired
    public DepartmentDayTypeServiceImpl(DepartmentDayTypeRepository departmentDayTypeRepository,
                                        ShiftRepository shiftRepository) {
        super(departmentDayTypeRepository);
        this.departmentDayTypeRepository = departmentDayTypeRepository;
        this.shiftRepository = shiftRepository;
    }

    @Override
    public List<DepartmentDayType> findAllByDepartmentId(Long departmentId) {
        return departmentDayTypeRepository.findAllByDepartmentId(departmentId);
    }

    // should be reworked or removed...
    @Override
    public List<DepartmentDayType> findAllByShiftId(Long shiftId) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentId(shift.getDepartmentId()))
                .orElse(null);
    }
}
