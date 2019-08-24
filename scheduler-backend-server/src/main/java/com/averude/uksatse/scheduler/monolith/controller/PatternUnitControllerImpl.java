package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.PatternUnitController;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.shared.controller.AbstractCrudController;
import com.averude.uksatse.scheduler.shared.service.PatternUnitService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
public class PatternUnitControllerImpl
        extends AbstractCrudController<PatternUnit> implements PatternUnitController {

    private final PatternUnitService patternUnitService;

    @Autowired
    PatternUnitControllerImpl(PatternUnitService patternUnitService) {
        super(patternUnitService, LoggerFactory.getLogger(PatternUnitController.class));
        this.patternUnitService = patternUnitService;
    }

    @Override
    public Iterable<PatternUnit> getAll(Long id) {
        return this.patternUnitService.findAllByPatternIdOrderByOrderId(id);
    }

    @Override
    public Iterable<PatternUnit> getAll() {
        return super.getAll();
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
