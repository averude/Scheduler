package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.entity.Position;
import com.averude.uksatse.scheduler.shared.repository.PositionRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByDepartmentIdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PositionServiceImpl
        extends AByDepartmentIdService<Position, Long> implements PositionService {

    private final ShiftRepository       shiftRepository;
    private final PositionRepository    positionRepository;

    @Autowired
    public PositionServiceImpl(PositionRepository positionRepository,
                               ShiftRepository shiftRepository) {
        super(positionRepository, shiftRepository);
        this.positionRepository = positionRepository;
        this.shiftRepository = shiftRepository;
    }
}
