package com.averude.uksatse.scheduler.core.service;

import java.io.Serializable;
import java.util.List;

public interface IByShiftIdService<T extends Serializable, ID> {
    List<T> findAllByShiftId(Long shiftId);
}
