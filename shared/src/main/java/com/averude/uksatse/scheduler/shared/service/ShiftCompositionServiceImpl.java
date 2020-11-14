package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.shared.repository.ShiftCompositionRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ShiftCompositionServiceImpl
        extends AService<ShiftComposition, Long> implements ShiftCompositionService {

    private final ShiftCompositionRepository shiftCompositionRepository;

    @Autowired
    public ShiftCompositionServiceImpl(ShiftCompositionRepository shiftCompositionRepository) {
        super(shiftCompositionRepository);
        this.shiftCompositionRepository = shiftCompositionRepository;
    }

    @Override
    @Transactional
    public List<ShiftComposition> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to) {
        return shiftCompositionRepository.findAllByDepartmentIdAndDatesBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<ShiftComposition> findAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        return shiftCompositionRepository.findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to);
    }
}
