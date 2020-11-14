package com.averude.uksatse.scheduler.core.interfaces.entity;

import java.time.LocalDate;

public interface HasDate {
    void setDate(LocalDate date);
    LocalDate getDate();
}
