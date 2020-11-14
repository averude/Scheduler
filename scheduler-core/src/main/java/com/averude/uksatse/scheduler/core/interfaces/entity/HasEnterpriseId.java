package com.averude.uksatse.scheduler.core.interfaces.entity;

import java.io.Serializable;

public interface HasEnterpriseId extends Serializable {
    Long getEnterpriseId();
    void setEnterpriseId(Long enterpriseId);
}
