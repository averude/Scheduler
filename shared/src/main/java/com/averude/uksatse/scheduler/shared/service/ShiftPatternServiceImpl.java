package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.dto.ShiftPatternDTO;
import com.averude.uksatse.scheduler.core.model.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;
import com.averude.uksatse.scheduler.shared.repository.PatternUnitRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftPatternGenerationRuleRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftPatternRepository;
import com.averude.uksatse.scheduler.shared.service.base.AService;
import com.averude.uksatse.scheduler.shared.utils.BasicDtoSavingUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ShiftPatternServiceImpl
        extends AService<ShiftPattern, Long> implements ShiftPatternService {

    private final ShiftPatternRepository shiftPatternRepository;
    private final PatternUnitRepository patternUnitRepository;
    private final ShiftPatternGenerationRuleRepository shiftPatternGenerationRuleRepository;
    private final BasicDtoSavingUtil    basicDtoSavingUtil;

    @Autowired
    public ShiftPatternServiceImpl(ShiftPatternRepository shiftPatternRepository,
                                   PatternUnitRepository patternUnitRepository,
                                   ShiftPatternGenerationRuleRepository shiftPatternGenerationRuleRepository,
                                   BasicDtoSavingUtil basicDtoSavingUtil) {
        super(shiftPatternRepository);
        this.shiftPatternRepository = shiftPatternRepository;
        this.patternUnitRepository = patternUnitRepository;
        this.shiftPatternGenerationRuleRepository = shiftPatternGenerationRuleRepository;
        this.basicDtoSavingUtil = basicDtoSavingUtil;
    }

    @Override
    @Transactional
    public List<? extends BasicDto<ShiftPattern, PatternUnit>> findAllDtoByDepartmentId(Long departmentId) {
        var patterns = shiftPatternRepository.findAllByDepartmentId(departmentId);
        return transformPatternsList(patterns);
    }

    @Override
    @Transactional
    public List<ShiftPattern> findAllByDepartmentId(Long departmentId) {
        return shiftPatternRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public BasicDto<ShiftPattern, PatternUnit> saveDto(BasicDto<ShiftPattern, PatternUnit> dto) {
        throw new UnsupportedOperationException();
    }

    @Override
    @Transactional
    public ShiftPatternDTO saveDTO(ShiftPatternDTO shiftPatternDTO) {
        var parent = shiftPatternDTO.getParent();
        shiftPatternRepository.save(parent);

        var collection = shiftPatternDTO.getCollection();
        if (collection.size() > 0) {
            collection.forEach(unit -> unit.setPatternId(parent.getId()));
            var unitsIds = basicDtoSavingUtil.getIds(collection);
            patternUnitRepository.deleteAllByPatternIdAndIdIsNotIn(parent.getId(), unitsIds);
            patternUnitRepository.saveAll(collection);
        } else {
            patternUnitRepository.deleteAllByPatternId(parent.getId());
        }


        var generationRules = shiftPatternDTO.getGenerationRules();
        if (generationRules.size() > 0) {
            generationRules.forEach(rule -> rule.setShiftPatternId(parent.getId()));
            var rulesIds = basicDtoSavingUtil.getIds(generationRules);
            shiftPatternGenerationRuleRepository.deleteAllByShiftPatternIdAndIdIsNotIn(parent.getId(), rulesIds);
            shiftPatternGenerationRuleRepository.saveAll(generationRules);
        } else {
            shiftPatternGenerationRuleRepository.deleteAllByShiftPatternId(parent.getId());
        }


        return shiftPatternDTO;
    }

    private List<ShiftPatternDTO> transformPatternsList(List<ShiftPattern> patterns) {
        return patterns
                .stream()
                .map(shiftPattern -> {
                    var dto = new ShiftPatternDTO();
                    dto.setParent(shiftPattern);
                    dto.setCollection(patternUnitRepository.findAllByPatternIdOrderByOrderId(shiftPattern.getId()));
                    dto.setGenerationRules(shiftPatternGenerationRuleRepository.findAllByShiftPatternIdOrderByOrderIdAsc(shiftPattern.getId()));
                    return dto;
                })
                .collect(Collectors.toList());
    }
}
