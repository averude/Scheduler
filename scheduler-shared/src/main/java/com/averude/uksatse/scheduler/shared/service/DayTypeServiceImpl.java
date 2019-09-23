package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.core.extractor.DataByAuthorityExtractor;
import com.averude.uksatse.scheduler.shared.repository.DayTypeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class DayTypeServiceImpl
        extends AbstractService<DayType, Long> implements DayTypeService {

    private final DayTypeRepository dayTypeRepository;
    private final DataByAuthorityExtractor extractor;

    @Autowired
    public DayTypeServiceImpl(DayTypeRepository dayTypeRepository,
                              DataByAuthorityExtractor extractor) {
        super(dayTypeRepository);
        this.dayTypeRepository = dayTypeRepository;
        this.extractor = extractor;
    }

    @Override
    @Transactional
    public List<DayType> findAllByDepartmentId(Long departmentId) {
        return dayTypeRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<DayType> findAllByAuth(Authentication authentication) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> findAll(),
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId),
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId));
    }
}
