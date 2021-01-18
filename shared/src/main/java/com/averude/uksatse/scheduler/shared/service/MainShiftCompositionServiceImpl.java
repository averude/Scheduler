package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.entity.MainShiftComposition;
import com.averude.uksatse.scheduler.shared.repository.MainShiftCompositionRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class MainShiftCompositionServiceImpl
        extends AService<MainShiftComposition, Long> implements MainShiftCompositionService {

    private final MainShiftCompositionRepository mainShiftCompositionRepository;

    @Autowired
    public MainShiftCompositionServiceImpl(MainShiftCompositionRepository mainShiftCompositionRepository) {
        super(mainShiftCompositionRepository);
        this.mainShiftCompositionRepository = mainShiftCompositionRepository;
    }

    @Override
    @Transactional
    public List<MainShiftComposition> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to) {
        return mainShiftCompositionRepository.findAllByDepartmentIdAndDatesBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<MainShiftComposition> findAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        return mainShiftCompositionRepository.findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqualOrderByEmployeeId(shiftId, from, to);
    }
}
