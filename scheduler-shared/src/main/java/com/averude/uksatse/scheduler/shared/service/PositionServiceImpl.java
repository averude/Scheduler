package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Position;
import com.averude.uksatse.scheduler.shared.repository.PositionRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PositionServiceImpl
        extends AbstractService<Position, Long> implements PositionService {

    private final ShiftRepository shiftRepository;
    private final PositionRepository positionRepository;

    @Autowired
    public PositionServiceImpl(ShiftRepository shiftRepository,
                               PositionRepository positionRepository) {
        super(positionRepository);
        this.shiftRepository = shiftRepository;
        this.positionRepository = positionRepository;
    }

    @Override
    @Transactional
    public List<Position> findAllByDepartmentId(Long departmentId) {
        return positionRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<Position> findAllByShiftId(Long shiftId) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentId(shift.getDepartmentId()))
                .orElse(null);
    }
}
