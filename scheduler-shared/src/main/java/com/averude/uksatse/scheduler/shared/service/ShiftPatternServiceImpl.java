package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.shared.repository.PatternUnitRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftPatternRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ShiftPatternServiceImpl
        extends AbstractService<ShiftPattern, Long> implements ShiftPatternService {
    private static final Logger logger = LoggerFactory.getLogger(ShiftPatternService.class);

    private final ShiftRepository shiftRepository;
    private final ShiftPatternRepository shiftPatternRepository;
    private final PatternUnitRepository patternUnitRepository;

    @Autowired
    public ShiftPatternServiceImpl(ShiftRepository shiftRepository,
                                   ShiftPatternRepository shiftPatternRepository,
                                   PatternUnitRepository patternUnitRepository) {
        super(shiftPatternRepository);
        this.shiftRepository = shiftRepository;
        this.shiftPatternRepository = shiftPatternRepository;
        this.patternUnitRepository = patternUnitRepository;
    }

    @Override
    @Transactional
    public List<BasicDto<ShiftPattern, PatternUnit>> findAllDtoByDepartmentId(Long departmentId) {
        return findAllByDepartmentId(departmentId)
                .stream()
                .map(getEntityToDtoConvertFunction())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<BasicDto<ShiftPattern, PatternUnit>> findAllDtoByShiftId(Long shiftId) {
        return findAllByShiftId(shiftId).stream()
                .map(getEntityToDtoConvertFunction())
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public BasicDto<ShiftPattern, PatternUnit> saveDto(BasicDto<ShiftPattern, PatternUnit> dto) {
        logger.debug("Saving entity {} to the DB...", dto);
        ShiftPattern shiftPattern = dto.getEntity();
        List<PatternUnit> units = dto.getCollection();
        shiftPatternRepository.save(shiftPattern);
        logger.debug("Deleting units that aren't in collection...");
        patternUnitRepository.deleteAllByPatternIdAndIdIsNotIn(shiftPattern.getId(), getIds(units));
        logger.debug("Deleted.");
        units.forEach(unit -> {
            if (unit.getPatternId() == null || unit.getPatternId() <= 0) {
                unit.setPatternId(shiftPattern.getId());
            }
        });
        patternUnitRepository.saveAll(units);
        return dto;
    }

    @Override
    @Transactional
    public List<ShiftPattern> findAllByDepartmentId(long departmentId) {
        return shiftPatternRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<ShiftPattern> findAllByShiftId(Long shiftId) {
        return shiftRepository.findById(shiftId)
                .map(shift -> findAllByDepartmentId(shift.getDepartmentId()))
                .orElse(null);
    }

    private Function<ShiftPattern, BasicDto<ShiftPattern, PatternUnit>> getEntityToDtoConvertFunction() {
        return pattern -> {
            var dto = new BasicDto<ShiftPattern, PatternUnit>();
            dto.setEntity(pattern);
            dto.setCollection(patternUnitRepository.findAllByPatternIdOrderByOrderId(pattern.getId()));
            return dto;
        };
    }

    private List<Long> getIds(List<PatternUnit> units) {
        return units
                .stream()
                .filter(unit -> unit.getId() != null && unit.getId() > 0)
                .map(PatternUnit::getId)
                .collect(Collectors.toList());
    }
}
