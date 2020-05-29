package com.averude.uksatse.scheduler.core.entity.interfaces;

import java.io.Serializable;

public interface HasEnterpriseId extends Serializable {
    Long getEnterpriseId();
    void setEnterpriseId(Long enterpriseId);
}
