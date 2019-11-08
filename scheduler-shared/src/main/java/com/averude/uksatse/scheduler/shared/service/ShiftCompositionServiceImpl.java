package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.shared.repository.ShiftCompositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class ShiftCompositionServiceImpl
        extends AbstractService<ShiftComposition, Long> implements ShiftCompositionService {

    private final ShiftCompositionRepository shiftCompositionRepository;

    @Autowired
    public ShiftCompositionServiceImpl(ShiftCompositionRepository shiftCompositionRepository) {
        super(shiftCompositionRepository);
        this.shiftCompositionRepository = shiftCompositionRepository;
    }

    @Override
    @Transactional
    public List<ShiftComposition> findAllByShiftIdAndDate(Long shiftId, LocalDate from, LocalDate to) {
        return shiftCompositionRepository.findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to);
    }
}
