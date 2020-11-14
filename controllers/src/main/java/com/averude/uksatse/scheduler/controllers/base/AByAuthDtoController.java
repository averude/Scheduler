package com.averude.uksatse.scheduler.controllers.base;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasId;
import com.averude.uksatse.scheduler.core.interfaces.service.IDtoService;
import com.averude.uksatse.scheduler.security.modifier.dto.DtoModifier;
import com.averude.uksatse.scheduler.security.state.dto.IByAuthDtoMethodResolver;
import lombok.NonNull;
import org.slf4j.Logger;
import org.springframework.security.core.Authentication;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public abstract class AByAuthDtoController<E extends HasId, C extends Serializable>
        extends ACrudController<E> {

    private IDtoService<E, C, Long>     service;
    private IByAuthDtoMethodResolver    dtoMethodResolver;
    private DtoModifier<E, C>           dtoModifier;

    public AByAuthDtoController(@NonNull IDtoService<E, C, Long> service,
                                @NonNull IByAuthDtoMethodResolver dtoMethodResolver,
                                DtoModifier<E, C> dtoModifier,
                                Logger logger) {
        super(service, logger);
        this.service = service;
        this.dtoMethodResolver = dtoMethodResolver;
        this.dtoModifier = dtoModifier;
    }

    public List<BasicDto<E, C>> getAllDtoByAuth(@NonNull Authentication authentication) {
        logger.debug("User:{} - Getting all DTOs.", authentication.getPrincipal());
        return dtoMethodResolver.findAll(authentication, service,  null, null);
    }

    public List<BasicDto<E, C>> getAllDtoByAuthAndDate(@NonNull Authentication authentication,
                                                       @NonNull LocalDate from,
                                                       @NonNull LocalDate to) {
        logger.debug("User:{} - Getting all DTOs from:{} to:{}.", authentication.getPrincipal(), from, to);
        return dtoMethodResolver.findAll(authentication, service, from, to);
    }

    public BasicDto<E, C> postDto(BasicDto<E, C> dto, Authentication authentication) {
        if (dtoModifier != null) dtoModifier.modify(dto, authentication);
        logger.debug("User:{} - Posting DTO:{}.", authentication.getPrincipal(), dto);
        return service.saveDto(dto);
    }

    public BasicDto<E, C> putDto(BasicDto<E, C> dto, Authentication authentication) {
        if (dtoModifier != null) dtoModifier.modify(dto, authentication);
        logger.debug("User:{} - Putting DTO:{}.", authentication.getPrincipal(), dto);
        return service.saveDto(dto);
    }
}
