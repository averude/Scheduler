package com.averude.uksatse.scheduler.controllers;

import com.averude.uksatse.scheduler.controllers.interfaces.ScheduleController;
import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.dto.GenerationDTO;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.security.entity.DepartmentAdminUserAccount;
import com.averude.uksatse.scheduler.security.entity.ShiftAdminUserAccount;
import com.averude.uksatse.scheduler.security.modifier.entity.DepartmentIdEntityModifier;
import com.averude.uksatse.scheduler.shared.service.ScheduleGenerationService;
import com.averude.uksatse.scheduler.shared.service.ScheduleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@Slf4j
@RestController
public class ScheduleControllerImpl implements ScheduleController {

    private final ScheduleService           scheduleService;
    private final ScheduleGenerationService scheduleGenerationService;
    private final DepartmentIdEntityModifier<WorkDay> entityModifier;

    @Autowired
    public ScheduleControllerImpl(ScheduleService scheduleService,
                                  DepartmentIdEntityModifier<WorkDay> entityModifier,
                                  ScheduleGenerationService scheduleGenerationService) {
        this.scheduleService = scheduleService;
        this.entityModifier = entityModifier;
        this.scheduleGenerationService = scheduleGenerationService;
    }

    @Override
    public ResponseEntity<Iterable<WorkDay>> create(Iterable<WorkDay> schedule,
                                                    Authentication authentication){
        schedule.forEach(workDay -> entityModifier.modify(workDay, authentication));
        scheduleService.saveAll(schedule);
        log.debug("Schedule created. Sending response.");
        return ResponseEntity.ok(schedule);
    }

    @Override
    public ResponseEntity<?> update(Iterable<WorkDay> schedule,
                                    Authentication authentication) {
        schedule.forEach(workDay -> entityModifier.modify(workDay, authentication));
        scheduleService.saveAll(schedule);
        log.debug("Schedule updated. Sending response.");
        return ResponseEntity.ok("WorkDays was successfully updated");
    }

    @Override
    public List<BasicDto<Employee, WorkDay>> getAllByAuthAndDate(Authentication authentication,
                                                                 LocalDate from,
                                                                 LocalDate to){

        var userAccount = authentication.getPrincipal();

        log.debug("Received GET request from user={} with params: from={}, to={}", userAccount, from, to);

        if (userAccount instanceof DepartmentAdminUserAccount) {
            var account = (DepartmentAdminUserAccount) userAccount;
            return scheduleService.findAllDtoByDepartmentIdAndDate(account.getDepartmentId(), from, to);
        } else if (userAccount instanceof ShiftAdminUserAccount) {
            var account = (ShiftAdminUserAccount) userAccount;
            return scheduleService.findAllDtoByShiftIdAndDate(account.getShiftId(), from, to);
        } else throw new AccessDeniedException("User doesn't have required permission");
    }

    @Override
    public ResponseEntity<?> generate(GenerationDTO generationDTO) {
        scheduleGenerationService.generate(
                generationDTO.getShiftId(),
                generationDTO.getFrom(),
                generationDTO.getTo(),
                generationDTO.getOffset());
        String body = "Schedule " + generationDTO.toString() + " was successfully generated";
        log.debug(body);
        return ResponseEntity.ok(body);
    }
}
