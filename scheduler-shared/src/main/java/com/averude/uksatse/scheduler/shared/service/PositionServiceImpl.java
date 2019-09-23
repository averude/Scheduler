package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.core.extractor.DataByAuthorityExtractor;
import com.averude.uksatse.scheduler.shared.repository.PositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PositionServiceImpl
        extends AbstractService<Position, Long> implements PositionService {

    private final PositionRepository positionRepository;
    private final DataByAuthorityExtractor extractor;

    @Autowired
    public PositionServiceImpl(PositionRepository positionRepository,
                               DataByAuthorityExtractor extractor) {
        super(positionRepository);
        this.positionRepository = positionRepository;
        this.extractor = extractor;
    }

    @Override
    @Transactional
    public List<Position> findAllByDepartmentId(Long departmentId) {
        return positionRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<Position> findAllByAuth(Authentication authentication) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> findAll(),
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId),
                (departmentId, shiftId) -> findAllByDepartmentId(departmentId));
    }
}
