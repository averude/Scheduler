package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.entity.SubstitutionComposition;
import com.averude.uksatse.scheduler.shared.repository.SubstitutionCompositionRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@Service
public class SubstitutionCompositionServiceImpl
        extends AService<SubstitutionComposition, Long>
        implements SubstitutionCompositionService {

    private final SubstitutionCompositionRepository substitutionCompositionRepository;

    @Autowired
    public SubstitutionCompositionServiceImpl(SubstitutionCompositionRepository substitutionCompositionRepository) {
        super(substitutionCompositionRepository);
        this.substitutionCompositionRepository = substitutionCompositionRepository;
    }

    @Override
    @Transactional
    public List<SubstitutionComposition> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to) {
        return substitutionCompositionRepository.findAllByDepartmentIdAndDatesBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<SubstitutionComposition> findAllByShiftIdsAndDateBetween(List<Long> shiftIds, LocalDate from, LocalDate to) {
        return substitutionCompositionRepository.findAllByShiftIdsAndDatesBetween(shiftIds, from, to);
    }
}
