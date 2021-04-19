package com.averude.uksatse.scheduler.core.interfaces.service;

import java.io.Serializable;
import java.util.List;

public interface IByDepartmentIdService<T extends Serializable, ID> {
    List<T> getAllByDepartmentId(Long departmentId);
}
