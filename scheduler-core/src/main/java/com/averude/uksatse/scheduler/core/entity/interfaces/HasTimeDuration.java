package com.averude.uksatse.scheduler.core.entity.interfaces;

import java.io.Serializable;

public interface HasTimeDuration extends Serializable {
    void setFrom(Integer from);
    void setTo(Integer to);
    Integer getFrom();
    Integer getTo();
}
