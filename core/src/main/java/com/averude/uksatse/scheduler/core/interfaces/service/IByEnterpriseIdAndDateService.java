package com.averude.uksatse.scheduler.core.interfaces.service;

import com.averude.uksatse.scheduler.core.validation.CheckDateParameters;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

public interface IByEnterpriseIdAndDateService<T extends Serializable, ID> {
    @CheckDateParameters
    List<T> findAllByEnterpriseIdAndDateBetween(Long enterpriseId, LocalDate from, LocalDate to);
}
