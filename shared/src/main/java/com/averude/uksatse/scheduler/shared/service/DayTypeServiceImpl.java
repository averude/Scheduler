package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.shared.repository.DayTypeRepository;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByEnterpriseIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DayTypeServiceImpl
        extends AByEnterpriseIdService<DayType, Long> implements DayTypeService {

    private final DepartmentRepository  departmentRepository;
    private final ShiftRepository       shiftRepository;
    private final DayTypeRepository     dayTypeRepository;

    @Autowired
    public DayTypeServiceImpl(DayTypeRepository dayTypeRepository,
                              DepartmentRepository departmentRepository,
                              ShiftRepository shiftRepository) {
        super(dayTypeRepository, departmentRepository, shiftRepository);
        this.departmentRepository = departmentRepository;
        this.shiftRepository = shiftRepository;
        this.dayTypeRepository = dayTypeRepository;
    }

    @Override
    @Transactional
    public List<DayType> findAllByDepartmentId(Long departmentId) {
        return dayTypeRepository.findAllByDepartmentId(departmentId);
    }
}
