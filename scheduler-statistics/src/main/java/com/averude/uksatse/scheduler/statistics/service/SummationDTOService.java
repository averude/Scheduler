package com.averude.uksatse.scheduler.statistics.service;

import com.averude.uksatse.scheduler.core.dto.SummationDTO;
import com.averude.uksatse.scheduler.core.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.service.IByShiftIdAndDateService;

public interface SummationDTOService extends IByDepartmentIdAndDateService<SummationDTO, Long>,
        IByShiftIdAndDateService<SummationDTO, Long> {
}
