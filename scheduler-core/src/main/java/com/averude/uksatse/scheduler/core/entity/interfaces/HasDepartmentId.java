package com.averude.uksatse.scheduler.core.entity.interfaces;

import java.io.Serializable;

public interface HasDepartmentId extends Serializable {
    Long getDepartmentId();
    void setDepartmentId(Long departmentId);
}
