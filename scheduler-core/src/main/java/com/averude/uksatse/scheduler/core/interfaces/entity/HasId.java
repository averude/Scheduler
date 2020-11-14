package com.averude.uksatse.scheduler.core.interfaces.entity;

import java.io.Serializable;

public interface HasId extends Serializable {
    void setId(Long id);
    Long getId();
}
