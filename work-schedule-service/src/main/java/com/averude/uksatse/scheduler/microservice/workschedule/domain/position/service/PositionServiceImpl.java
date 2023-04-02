package com.averude.uksatse.scheduler.microservice.workschedule.domain.position.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.position.entity.Position;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.repository.PositionRepository;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.service.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PositionServiceImpl
        extends AService<Position, Long> implements PositionService {

    private final PositionRepository    positionRepository;

    @Autowired
    public PositionServiceImpl(PositionRepository positionRepository) {
        super(positionRepository);
        this.positionRepository = positionRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<Position> findAllByDepartmentId(Long departmentId) {
        return positionRepository.findAllByDepartmentId(departmentId);
    }
}
