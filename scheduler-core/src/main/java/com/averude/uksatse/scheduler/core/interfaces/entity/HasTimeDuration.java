package com.averude.uksatse.scheduler.core.interfaces.entity;

import java.io.Serializable;

public interface HasTimeDuration extends Serializable {
    void setFrom(Integer from);
    void setTo(Integer to);
    Integer getFrom();
    Integer getTo();
}
