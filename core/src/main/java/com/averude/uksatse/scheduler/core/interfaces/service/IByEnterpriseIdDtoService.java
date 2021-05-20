package com.averude.uksatse.scheduler.core.interfaces.service;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;

import java.io.Serializable;
import java.util.List;

public interface IByEnterpriseIdDtoService<T extends Serializable, C extends Serializable, ID> {
    List<BasicDto<T, C>> findAllDtoByEnterpriseId(Long enterpriseId);
}
