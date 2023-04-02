package com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces;

import java.time.LocalDate;

public interface HasDate {
    void setDate(LocalDate date);
    LocalDate getDate();
}
