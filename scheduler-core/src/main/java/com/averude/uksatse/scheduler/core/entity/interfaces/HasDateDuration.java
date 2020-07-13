package com.averude.uksatse.scheduler.core.entity.interfaces;

import java.time.LocalDate;

public interface HasDateDuration {
    LocalDate getFrom();
    LocalDate getTo();
    void setFrom(LocalDate from);
    void setTo(LocalDate to);
}
