package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.shared.repository.DepartmentDayTypeRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByDepartmentIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentDayTypeServiceImpl
        extends AByDepartmentIdService<DepartmentDayType, Long> implements DepartmentDayTypeService {

    private final DepartmentDayTypeRepository   departmentDayTypeRepository;
    private final ShiftRepository               shiftRepository;

    @Autowired
    public DepartmentDayTypeServiceImpl(DepartmentDayTypeRepository departmentDayTypeRepository,
                                        ShiftRepository shiftRepository) {
        super(departmentDayTypeRepository, shiftRepository);
        this.departmentDayTypeRepository = departmentDayTypeRepository;
        this.shiftRepository = shiftRepository;
    }
}
