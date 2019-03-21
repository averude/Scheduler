package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PositionServiceImpl
        extends AbstractService<Position, Long> implements PositionService {

    private final PositionRepository positionRepository;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public PositionServiceImpl(PositionRepository positionRepository,
                               TokenExtraDetailsExtractor detailsExtractor) {
        super(positionRepository);
        this.positionRepository = positionRepository;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public Iterable<Position> findAllByDepartmentId(Long departmentId) {
        return positionRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public Iterable<Position> findAllByAuth(Authentication authentication) {
        Long departmentId = (Long) detailsExtractor
                .extract(authentication)
                .get(TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return positionRepository.findAllByDepartmentId(departmentId);
    }
}
