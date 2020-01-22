package com.averude.uksatse.scheduler.generator.model;

import java.time.LocalDate;
import java.util.List;

public interface ReportData<T> {
    LocalDate getFrom();
    void setFrom(LocalDate from);

    LocalDate getTo();
    void setTo(LocalDate to);

    List<T> getData();
    void setData(List<T> data);
}
