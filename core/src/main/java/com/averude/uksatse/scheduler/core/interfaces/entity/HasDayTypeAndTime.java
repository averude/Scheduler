package com.averude.uksatse.scheduler.core.interfaces.entity;

import com.averude.uksatse.scheduler.core.model.entity.DayType;

public interface HasDayTypeAndTime extends HasTime {
    DayType getDayType();
    void setDayType(DayType dayType);
}
