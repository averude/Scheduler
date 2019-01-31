package repository;

import entity.PatternUnit;
import org.springframework.data.repository.CrudRepository;

public interface PatternUnitRepository extends CrudRepository<PatternUnit, Long> {
    Iterable<PatternUnit> findAllByPatternIdOrderByOrderId(long patternId);
}
