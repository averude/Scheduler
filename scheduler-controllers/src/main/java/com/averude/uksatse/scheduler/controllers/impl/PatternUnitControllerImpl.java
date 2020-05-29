package com.averude.uksatse.scheduler.controllers.impl;

import com.averude.uksatse.scheduler.controllers.base.ACrudController;
import com.averude.uksatse.scheduler.controllers.interfaces.PatternUnitController;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.shared.service.PatternUnitService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@Deprecated
@RestController
public class PatternUnitControllerImpl
        extends ACrudController<PatternUnit> implements PatternUnitController {

    private final PatternUnitService patternUnitService;

    @Autowired
    PatternUnitControllerImpl(PatternUnitService patternUnitService) {
        super(patternUnitService, LoggerFactory.getLogger(PatternUnitController.class));
        this.patternUnitService = patternUnitService;
    }

    @Override
    public List<PatternUnit> getAllByPatternId(Long id) {
        return this.patternUnitService.findAllByPatternId(id);
    }

    @Override
    public Optional<PatternUnit> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return super.delete(id);
    }
}
