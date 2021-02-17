package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthController;
import com.averude.uksatse.scheduler.controllers.interfaces.MainCompositionController;
import com.averude.uksatse.scheduler.controllers.logging.Logged;
import com.averude.uksatse.scheduler.core.model.entity.MainShiftComposition;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.MainShiftCompositionService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
public class MainCompositionControllerImpl
        extends AByAuthController<MainShiftComposition> implements MainCompositionController {

    private final MainShiftCompositionService mainShiftCompositionService;

    @Autowired
    public MainCompositionControllerImpl(MainShiftCompositionService mainShiftCompositionService,
                                         SimpleByAuthMethodResolver authStrategy) {
        super(mainShiftCompositionService, authStrategy, LoggerFactory.getLogger(MainCompositionController.class));
        this.mainShiftCompositionService = mainShiftCompositionService;
    }

    @Override
    public List<MainShiftComposition> getAllByAuth(Authentication authentication, LocalDate from, LocalDate to) {
        return super.getAllByAuth(authentication, from, to);
    }

    @Logged
    @Override
    public List<MainShiftComposition> getAllByDepartmentId(Long departmentId, LocalDate from, LocalDate to) {
        return mainShiftCompositionService.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Logged
    @Override
    public List<MainShiftComposition> getAllByShiftIds(List<Long> shiftIds, LocalDate from, LocalDate to) {
        return mainShiftCompositionService.findAllByShiftIdsAndDateBetween(shiftIds, from, to);
    }

    @Override
    public Optional<MainShiftComposition> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(MainShiftComposition entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(MainShiftComposition entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
