package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthDtoController;
import com.averude.uksatse.scheduler.controllers.interfaces.ShiftPatternController;
import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.dto.ShiftPatternDTO;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.security.modifier.dto.DepartmentIdDtoModifier;
import com.averude.uksatse.scheduler.security.state.dto.SimpleDtoByAuthMethodResolver;
import com.averude.uksatse.scheduler.security.state.entity.IByAuthMethodResolver;
import com.averude.uksatse.scheduler.security.state.entity.SimpleByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.ShiftPatternService;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class ShiftPatternControllerImpl
        extends AByAuthDtoController<ShiftPattern, PatternUnit> implements ShiftPatternController {

    private ShiftPatternService     shiftPatternService;
    private IByAuthMethodResolver   methodResolver;
    private DepartmentIdDtoModifier<ShiftPattern, PatternUnit> dtoModifier;

    @Autowired
    ShiftPatternControllerImpl(ShiftPatternService shiftPatternService,
                               SimpleByAuthMethodResolver methodResolver,
                               SimpleDtoByAuthMethodResolver dtoMethodResolver,
                               DepartmentIdDtoModifier<ShiftPattern, PatternUnit> dtoModifier) {
        super(shiftPatternService, dtoMethodResolver, dtoModifier, LoggerFactory.getLogger(ShiftPatternController.class));
        this.shiftPatternService = shiftPatternService;
        this.dtoModifier = dtoModifier;
        this.methodResolver = methodResolver;
    }

    @Override
    public List<? extends BasicDto<ShiftPattern, PatternUnit>> getAllDtoByAuth(Authentication authentication) {
        return super.getAllDtoByAuth(authentication);
    }

    @Override
    public Optional<ShiftPattern> get(Long id) {
        return super.get(id);
    }

    @Override
    public ShiftPatternDTO postDTO(ShiftPatternDTO shiftPatternDTO, Authentication authentication) {
        if (dtoModifier != null) dtoModifier.modify(shiftPatternDTO, authentication);
        logger.debug("User:{} - Posting DTO:{}.", authentication.getPrincipal(), shiftPatternDTO);
        return shiftPatternService.saveDTO(shiftPatternDTO);
    }

    @Override
    public ShiftPatternDTO putDTO(ShiftPatternDTO shiftPatternDTO, Authentication authentication) {
        if (dtoModifier != null) dtoModifier.modify(shiftPatternDTO, authentication);
        logger.debug("User:{} - Posting DTO:{}.", authentication.getPrincipal(), shiftPatternDTO);
        return shiftPatternService.saveDTO(shiftPatternDTO);
    }

    @Override
    public List<ShiftPattern> getAll(Authentication authentication) {
        return methodResolver.findAll(authentication, shiftPatternService, null, null);
    }

    @Override
    public ResponseEntity<Long> post(ShiftPattern entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(ShiftPattern entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
