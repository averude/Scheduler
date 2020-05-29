package com.averude.uksatse.scheduler.core.service;

import com.averude.uksatse.scheduler.core.dto.BasicDto;

import java.io.Serializable;
import java.util.List;

public interface IByEnterpriseIdDtoService<T extends Serializable, C extends Serializable, ID> extends IByEnterpriseIdService<T, ID> {
    List<BasicDto<T, C>> findAllDtoByEnterpriseId(Long enterpriseId);
    List<BasicDto<T, C>> findAllDtoByDepartmentId(Long departmentId);
    List<BasicDto<T, C>> findAllDtoByShiftId(Long shiftId);
    BasicDto<T, C> saveDto(BasicDto<T, C> dto);
}
