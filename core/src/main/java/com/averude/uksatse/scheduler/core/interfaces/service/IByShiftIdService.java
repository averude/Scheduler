package com.averude.uksatse.scheduler.core.interfaces.service;

import java.io.Serializable;
import java.util.List;

public interface IByShiftIdService<T extends Serializable, ID> {
    List<T> findAllByShiftId(Long shiftId);
}
