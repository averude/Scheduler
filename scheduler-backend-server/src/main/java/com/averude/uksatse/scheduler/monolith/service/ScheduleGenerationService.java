package com.averude.uksatse.scheduler.monolith.service;

import java.time.LocalDate;

public interface ScheduleGenerationService {
    void generate(Long shiftId, LocalDate from, LocalDate to, int offset);
}
