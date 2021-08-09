package com.averude.uksatse.scheduler.microservice.workschedule.service;

import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

public interface WorkingNormGenerationService {
    @Transactional(propagation = Propagation.REQUIRED)
    void generateWorkingNorm(Long departmentId,
                             Long shiftId,
                             LocalDate from,
                             LocalDate to,
                             int offset);
}
