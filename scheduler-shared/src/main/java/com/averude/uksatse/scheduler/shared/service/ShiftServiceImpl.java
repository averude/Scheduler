package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Shift;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShiftServiceImpl
        extends AbstractService<Shift, Long> implements ShiftService {

    private final ShiftRepository shiftRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public ShiftServiceImpl(ShiftRepository shiftRepository,
                            TokenExtraDetailsExtractor detailsExtractor) {
        super(shiftRepository);
        this.shiftRepository = shiftRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public Iterable<Shift> findAllByDepartmentId(long departmentId) {
        return shiftRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<Shift> findAllByAuth(Authentication authentication) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return shiftRepository.findAllByDepartmentId(departmentId);
    }
}
