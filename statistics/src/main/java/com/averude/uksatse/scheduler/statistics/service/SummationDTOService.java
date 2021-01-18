package com.averude.uksatse.scheduler.statistics.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByDepartmentIdAndDateService;
import com.averude.uksatse.scheduler.core.interfaces.service.IByShiftIdAndDateService;
import com.averude.uksatse.scheduler.core.model.dto.SummationDTO;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

public interface SummationDTOService extends IByDepartmentIdAndDateService<SummationDTO, Long>,
        IByShiftIdAndDateService<SummationDTO, Long> {
    @Transactional
    List<SummationDTO> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                           LocalDate from,
                                                           LocalDate to,
                                                           String mode);

    @Transactional
    List<SummationDTO> findAllByShiftIdAndDateBetween(Long departmentId,
                                                      LocalDate from,
                                                      LocalDate to,
                                                      String mode);
}
