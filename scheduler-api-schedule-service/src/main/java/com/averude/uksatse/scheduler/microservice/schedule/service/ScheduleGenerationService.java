package com.averude.uksatse.scheduler.microservice.schedule.service;

import java.time.LocalDate;

public interface ScheduleGenerationService {
    void generate(Long shiftId, LocalDate from, LocalDate to, int offset);
}
