package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.controller;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.dto.GenerationDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.service.ScheduleGenerationService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.service.WorkingNormGenerationService;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/enterprises/{enterpriseId}/departments/{departmentId}/generation")
@RestController
@RequiredArgsConstructor
public class GenerationController {

    private final ScheduleGenerationService scheduleGenerationService;
    private final WorkingNormGenerationService workingNormGenerationService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #departmentId)")
    @PostMapping("/schedule")
    public ResponseEntity<?> generate(@PathVariable Long enterpriseId,
                                      @PathVariable Long departmentId,
                                      @RequestBody @Valid GenerationDTO generationDTO) {
        scheduleGenerationService.generate(
                enterpriseId,
                generationDTO.getShiftId(),
                generationDTO.getFrom(),
                generationDTO.getTo(),
                generationDTO.getOffset());
        String body = "Schedule " + generationDTO.toString() + " was successfully generated";
        return ResponseEntity.ok(body);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #departmentId)")
    @PostMapping("/working_norm")
    public void generateWorkingHoursNorm(@PathVariable Long enterpriseId,
                                         @PathVariable Long departmentId,
                                         @RequestBody @Valid GenerationDTO generationDTO) {
        workingNormGenerationService.generateWorkingNorm(
                enterpriseId,
                departmentId,
                generationDTO.getShiftId(),
                generationDTO.getFrom(),
                generationDTO.getTo(),
                generationDTO.getOffset());
    }

}
