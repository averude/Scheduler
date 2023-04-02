package com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces;

import java.io.Serializable;

public interface HasTimeDuration extends Serializable {
    void setFrom(Integer from);
    void setTo(Integer to);
    Integer getFrom();
    Integer getTo();
}
