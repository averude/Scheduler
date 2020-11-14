package com.averude.uksatse.scheduler.core.interfaces.entity;

import java.time.LocalDate;

public interface HasDateDuration {
    LocalDate getFrom();
    LocalDate getTo();
    void setFrom(LocalDate from);
    void setTo(LocalDate to);
}
