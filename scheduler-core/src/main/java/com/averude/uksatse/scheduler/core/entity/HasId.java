package com.averude.uksatse.scheduler.core.entity;

import java.io.Serializable;

public interface HasId extends Serializable {
    void setId(Long id);
    Long getId();
}
