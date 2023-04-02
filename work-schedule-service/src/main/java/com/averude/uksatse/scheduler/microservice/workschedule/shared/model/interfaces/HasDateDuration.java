package com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces;

import java.time.LocalDate;

public interface HasDateDuration {
    LocalDate getFrom();
    LocalDate getTo();
    void setFrom(LocalDate from);
    void setTo(LocalDate to);
}
