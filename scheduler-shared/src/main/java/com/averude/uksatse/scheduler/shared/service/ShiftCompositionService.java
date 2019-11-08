package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ShiftComposition;

import java.time.LocalDate;
import java.util.List;

public interface ShiftCompositionService extends GenericService<ShiftComposition, Long> {
    List<ShiftComposition> findAllByShiftIdAndDate(Long shiftId,
                                                   LocalDate from,
                                                   LocalDate to);
}
