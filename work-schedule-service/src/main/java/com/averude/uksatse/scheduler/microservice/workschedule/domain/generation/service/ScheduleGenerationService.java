package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.service;

import java.time.LocalDate;

public interface ScheduleGenerationService {
    void generate(Long enterpriseId, Long shiftId, LocalDate from, LocalDate to, int offset);
}
