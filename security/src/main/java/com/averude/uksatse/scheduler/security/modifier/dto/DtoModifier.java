package com.averude.uksatse.scheduler.security.modifier.dto;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import org.springframework.security.core.Authentication;

import java.io.Serializable;

public interface DtoModifier<P extends Serializable, C extends Serializable> {
    void modify(BasicDto<P, C> dto, Authentication authentication);
}
