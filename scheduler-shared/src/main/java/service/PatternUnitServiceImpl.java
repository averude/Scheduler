package service;

import entity.PatternUnit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import repository.PatternUnitRepository;


@Service
public class PatternUnitServiceImpl extends AbstractService<PatternUnit, Long>
        implements PatternUnitService {

    private final PatternUnitRepository patternUnitRepository;

    @Autowired
    public PatternUnitServiceImpl(PatternUnitRepository patternUnitRepository) {
        super(patternUnitRepository);
        this.patternUnitRepository = patternUnitRepository;
    }

    @Override
    @Transactional
    public Iterable<PatternUnit> findAllByPatternIdOrderByOrderId(long patternId) {
        return patternUnitRepository.findAllByPatternIdOrderByOrderId(patternId);
    }
}
