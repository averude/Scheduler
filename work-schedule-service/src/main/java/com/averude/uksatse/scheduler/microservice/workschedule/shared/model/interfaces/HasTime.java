package com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces;

public interface HasTime {
    Integer getStartTime();
    void setStartTime(Integer startTime);
    Integer getBreakStartTime();
    void setBreakStartTime(Integer breakStartTime);
    Integer getBreakEndTime();
    void setBreakEndTime(Integer breakEndTime);
    Integer getEndTime();
    void setEndTime(Integer endTime);
}
