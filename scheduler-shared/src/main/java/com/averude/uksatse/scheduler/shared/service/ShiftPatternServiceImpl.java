package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.extractor.DataByAuthorityExtractor;
import com.averude.uksatse.scheduler.shared.repository.ShiftPatternRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ShiftPatternServiceImpl
        extends AbstractService<ShiftPattern, Long> implements ShiftPatternService {

    private final ShiftPatternRepository shiftPatternRepository;
    private final DataByAuthorityExtractor extractor;

    @Autowired
    public ShiftPatternServiceImpl(ShiftPatternRepository shiftPatternRepository,
                                   DataByAuthorityExtractor extractor) {
        super(shiftPatternRepository);
        this.shiftPatternRepository = shiftPatternRepository;
        this.extractor = extractor;
    }

    @Override
    @Transactional
    public List<ShiftPattern> findAllByDepartmentId(long departmentId) {
        return shiftPatternRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<ShiftPattern> findAllByAuth(Authentication authentication) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId),
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId));
    }
}
