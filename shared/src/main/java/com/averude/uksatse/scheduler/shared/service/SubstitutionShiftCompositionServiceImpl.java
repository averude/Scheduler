package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.SubstitutionShiftComposition;
import com.averude.uksatse.scheduler.shared.repository.SubstitutionShiftCompositionRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
public class SubstitutionShiftCompositionServiceImpl
        extends AService<SubstitutionShiftComposition, Long>
        implements SubstitutionShiftCompositionService {

    private final SubstitutionShiftCompositionRepository substitutionShiftCompositionRepository;

    @Autowired
    public SubstitutionShiftCompositionServiceImpl(SubstitutionShiftCompositionRepository substitutionShiftCompositionRepository) {
        super(substitutionShiftCompositionRepository);
        this.substitutionShiftCompositionRepository = substitutionShiftCompositionRepository;
    }

    @Override
    @Transactional
    public List<SubstitutionShiftComposition> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to) {
        return substitutionShiftCompositionRepository.findAllByDepartmentIdAndDatesBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<SubstitutionShiftComposition> findAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to) {
        return substitutionShiftCompositionRepository.findAllByShiftIdAndDatesBetween(shiftId, from, to);
    }
}
