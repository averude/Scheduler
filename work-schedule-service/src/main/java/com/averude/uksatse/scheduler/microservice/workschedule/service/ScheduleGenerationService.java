package com.averude.uksatse.scheduler.microservice.workschedule.service;

import java.time.LocalDate;

public interface ScheduleGenerationService {
    void generate(Long enterpriseId, Long shiftId, LocalDate from, LocalDate to, int offset);
}
