package com.averude.uksatse.scheduler.microservice.workschedule.domain.departmentdaytype.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.departmentdaytype.entity.DepartmentDayType;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.DepartmentDayTypeRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.service.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DepartmentDayTypeServiceImpl
        extends AService<DepartmentDayType, Long> implements DepartmentDayTypeService {

    private final DepartmentDayTypeRepository   departmentDayTypeRepository;

    @Autowired
    public DepartmentDayTypeServiceImpl(DepartmentDayTypeRepository departmentDayTypeRepository) {
        super(departmentDayTypeRepository);
        this.departmentDayTypeRepository = departmentDayTypeRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepartmentDayType> findAllByDepartmentId(Long departmentId) {
        return departmentDayTypeRepository.findAllByDepartmentId(departmentId);
    }
}
