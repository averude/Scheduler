package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
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
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public ShiftPatternServiceImpl(ShiftPatternRepository shiftPatternRepository,
                                   TokenExtraDetailsExtractor detailsExtractor) {
        super(shiftPatternRepository);
        this.shiftPatternRepository = shiftPatternRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public List<ShiftPattern> findAllByDepartmentId(long departmentId) {
        return shiftPatternRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<ShiftPattern> findAllByAuth(Authentication authentication) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return findAllByDepartmentId(departmentId);
    }
}
