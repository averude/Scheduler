package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Shift;

import java.time.LocalDate;

public interface ScheduleGenerationService {
    void generate(Shift shift, LocalDate from, LocalDate to, int offset);
}
