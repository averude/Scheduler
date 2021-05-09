package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.dto.GenerationDTO;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.ScheduleGenerationService;
import com.averude.uksatse.scheduler.shared.service.WorkingNormGenerationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping("/generation")
@RestController
@RequiredArgsConstructor
public class GenerationController {

    private final ScheduleGenerationService scheduleGenerationService;
    private final WorkingNormGenerationService workingNormGenerationService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #departmentId)")
    @PostMapping("/schedule/{departmentId}")
    public ResponseEntity<?> generate(@PathVariable Long departmentId,
                                      @RequestBody @Valid GenerationDTO generationDTO) {
        scheduleGenerationService.generate(
                generationDTO.getShiftId(),
                generationDTO.getFrom(),
                generationDTO.getTo(),
                generationDTO.getOffset());
        String body = "Schedule " + generationDTO.toString() + " was successfully generated";
        return ResponseEntity.ok(body);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #departmentId)")
    @PostMapping("/working_norm/{departmentId}")
    public void generateWorkingHoursNorm(@PathVariable Long departmentId,
                                         @RequestBody @Valid GenerationDTO generationDTO) {
        workingNormGenerationService.generateWorkingNorm(departmentId,
                generationDTO.getShiftId(),
                generationDTO.getFrom(),
                generationDTO.getTo(),
                generationDTO.getOffset());
    }

}
