package com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.entity.DayType;

public interface HasDayTypeAndTime extends HasTime {
    DayType getDayType();
    void setDayType(DayType dayType);
}
