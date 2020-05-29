package com.averude.uksatse.scheduler.core.service;

import com.averude.uksatse.scheduler.core.validation.CheckDateParameters;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public interface IByShiftIdAndDateService<T extends Serializable, ID> {
    @CheckDateParameters
    List<T> findAllByShiftIdAndDateBetween(Long shiftId, LocalDate from, LocalDate to);
}
