package com.averude.uksatse.scheduler.core.interfaces.entity;

import java.io.Serializable;

public interface HasDepartmentId extends Serializable {
    Long getDepartmentId();
    void setDepartmentId(Long departmentId);
}
