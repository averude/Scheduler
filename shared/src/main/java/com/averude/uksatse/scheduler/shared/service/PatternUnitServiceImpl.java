package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.shared.repository.PatternUnitRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PatternUnitServiceImpl extends AService<PatternUnit, Long>
        implements PatternUnitService {

    private final PatternUnitRepository patternUnitRepository;

    @Autowired
    public PatternUnitServiceImpl(PatternUnitRepository patternUnitRepository) {
        super(patternUnitRepository);
        this.patternUnitRepository = patternUnitRepository;
    }

    @Override
    @Transactional
    public List<PatternUnit> findAllByPatternId(long patternId) {
        return patternUnitRepository.findAllByPatternIdOrderByOrderId(patternId);
    }
}
