package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.shared.repository.PatternUnitRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftPatternRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByDepartmentIdDtoService;
import com.averude.uksatse.scheduler.shared.utils.BasicDtoSavingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShiftPatternServiceImpl
        extends AByDepartmentIdDtoService<ShiftPattern, PatternUnit, Long> implements ShiftPatternService {

    private final ShiftPatternRepository shiftPatternRepository;
    private final PatternUnitRepository patternUnitRepository;
    private final BasicDtoSavingUtil    basicDtoSavingUtil;

    @Autowired
    public ShiftPatternServiceImpl(ShiftPatternRepository shiftPatternRepository,
                                   PatternUnitRepository patternUnitRepository,
                                   ShiftRepository shiftRepository,
                                   BasicDtoSavingUtil basicDtoSavingUtil) {
        super(shiftPatternRepository, patternUnitRepository, shiftRepository, basicDtoSavingUtil);
        this.shiftPatternRepository = shiftPatternRepository;
        this.patternUnitRepository = patternUnitRepository;
        this.basicDtoSavingUtil = basicDtoSavingUtil;
    }

    @Override
    protected List<PatternUnit> getChildren(ShiftPattern parent) {
        return patternUnitRepository.findAllByPatternIdOrderByOrderId(parent.getId());
    }

    @Override
    protected void removeExcessChildren(ShiftPattern parent, List<PatternUnit> children) {
        patternUnitRepository.deleteAllByPatternIdAndIdIsNotIn(parent.getId(), basicDtoSavingUtil.getIds(children));
    }

    @Override
    protected void setChildParentRelation(ShiftPattern parentEntity, List<PatternUnit> collection) {
        collection.forEach(unit -> {
            if (unit.getPatternId() == null || unit.getPatternId() <= 0) {
                unit.setPatternId(parentEntity.getId());
            }
        });
    }
}
