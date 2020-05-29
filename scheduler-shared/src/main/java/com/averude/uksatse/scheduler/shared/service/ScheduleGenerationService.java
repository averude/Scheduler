package com.averude.uksatse.scheduler.shared.service;

import java.time.LocalDate;

public interface ScheduleGenerationService {
    void generate(Long shiftId, LocalDate from, LocalDate to, int offset);
}
