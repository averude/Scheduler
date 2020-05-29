package com.averude.uksatse.scheduler.core.service;

import java.io.Serializable;
import java.util.List;

public interface IByDepartmentIdService<T extends Serializable, ID> {
    List<T> findAllByDepartmentId(Long departmentId);
}
