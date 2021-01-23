package com.averude.uksatse.scheduler.core.interfaces.service;

import java.io.Serializable;
import java.util.List;

public interface IByShiftIdsService<T extends Serializable, ID> {
    List<T> findAllByShiftIds(List<Long> shiftIds);
}
