package com.averude.uksatse.scheduler.core.service;

import com.averude.uksatse.scheduler.core.dto.BasicDto;

import javax.validation.Valid;
import java.io.Serializable;

public interface IDtoService<E extends Serializable, C extends Serializable, ID> extends IService<E, ID> {
    BasicDto<E, C> saveDto(@Valid BasicDto<E, C> dto);
}
