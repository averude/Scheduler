package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.averude.uksatse.scheduler.shared.repository.PositionRepository;

@Service
public class PositionServiceImpl
        extends AbstractService<Position, Long> implements PositionService {

    private final PositionRepository positionRepository;

    @Autowired
    public PositionServiceImpl(PositionRepository positionRepository) {
        super(positionRepository);
        this.positionRepository = positionRepository;
    }

    @Override
    @Transactional
    public Iterable<Position> findAllByDepartmentId(Long departmentId) {
        return positionRepository.findAllByDepartmentId(departmentId);
    }
}
