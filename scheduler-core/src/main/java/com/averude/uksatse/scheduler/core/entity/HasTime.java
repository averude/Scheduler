package com.averude.uksatse.scheduler.core.entity;

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
