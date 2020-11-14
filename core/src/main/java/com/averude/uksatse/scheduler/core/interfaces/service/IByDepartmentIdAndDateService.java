package com.averude.uksatse.scheduler.core.interfaces.service;

import com.averude.uksatse.scheduler.core.validation.CheckDateParameters;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public interface IByDepartmentIdAndDateService<T extends Serializable, ID> {
    @CheckDateParameters
    List<T> findAllByDepartmentIdAndDateBetween(Long departmentId, LocalDate from, LocalDate to);
}
