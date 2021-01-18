package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.base.AByAuthDtoController;
import com.averude.uksatse.scheduler.controllers.interfaces.SummationColumnController;
import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.security.modifier.dto.EnterpriseIdDtoModifier;
import com.averude.uksatse.scheduler.security.state.dto.SimpleDtoByAuthMethodResolver;
import com.averude.uksatse.scheduler.shared.service.SummationColumnService;
import lombok.NonNull;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
public class SummationColumnControllerImpl
        extends AByAuthDtoController<SummationColumn, SummationColumnDayTypeRange> implements SummationColumnController {

    @Autowired
    public SummationColumnControllerImpl(SummationColumnService summationColumnService,
                                         SimpleDtoByAuthMethodResolver authStrategy,
                                         EnterpriseIdDtoModifier<SummationColumn, SummationColumnDayTypeRange> dtoModifier) {
        super(summationColumnService, authStrategy, dtoModifier, LoggerFactory.getLogger(SummationColumnController.class));
    }

    @Override
    public List<? extends BasicDto<SummationColumn, SummationColumnDayTypeRange>> getAllDtoByAuth(@NonNull Authentication authentication) {
        return super.getAllDtoByAuth(authentication);
    }

    @Override
    public BasicDto<SummationColumn, SummationColumnDayTypeRange> postDto(BasicDto<SummationColumn, SummationColumnDayTypeRange> dto, Authentication authentication) {
        return super.postDto(dto, authentication);
    }

    @Override
    public BasicDto<SummationColumn, SummationColumnDayTypeRange> putDto(BasicDto<SummationColumn, SummationColumnDayTypeRange> dto, Authentication authentication) {
        return super.putDto(dto, authentication);
    }

    @Override
    public Optional<SummationColumn> get(Long id) {
        return super.get(id);
    }

    @Override
    public ResponseEntity<Long> post(SummationColumn entity, Authentication authentication) {
        return super.post(entity, authentication);
    }

    @Override
    public ResponseEntity<?> put(SummationColumn entity, Authentication authentication) {
        return super.put(entity, authentication);
    }

    @Override
    public ResponseEntity<?> delete(Long id, Authentication authentication) {
        return super.delete(id, authentication);
    }
}
