package com.averude.uksatse.scheduler.core.entity.interfaces;

import java.time.LocalDate;

public interface HasDate {
    void setDate(LocalDate date);
    LocalDate getDate();
}
