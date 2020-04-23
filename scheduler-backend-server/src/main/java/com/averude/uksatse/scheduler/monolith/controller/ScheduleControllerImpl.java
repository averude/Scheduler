package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.ScheduleController;
import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.dto.ScheduleGenerationDTO;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.monolith.service.ScheduleGenerationService;
import com.averude.uksatse.scheduler.shared.service.ScheduleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;

@RestController
@RequestMapping("/schedule")
public class ScheduleControllerImpl implements ScheduleController {
    private Logger logger = LoggerFactory.getLogger(ScheduleController.class);

    private final ScheduleService scheduleService;
    private final ScheduleGenerationService scheduleGenerationService;

    @Autowired
    public ScheduleControllerImpl(ScheduleService scheduleService,
                                  ScheduleGenerationService scheduleGenerationService) {
        this.scheduleService = scheduleService;
        this.scheduleGenerationService = scheduleGenerationService;
    }

    @Override
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Iterable<WorkDay>> create(@Valid @RequestBody Iterable<WorkDay> schedule){
        scheduleService.saveAll(schedule);
        logger.debug("Schedule created. Sending response.");
        return ResponseEntity.ok(schedule);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update(@Valid @RequestBody Iterable<WorkDay> schedule) {
        scheduleService.saveAll(schedule);
        logger.debug("Schedule updated. Sending response.");
        return ResponseEntity.ok("WorkDays was successfully updated");
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/dates")
    public Iterable<BasicDto<Employee, WorkDay>> searchByAuthAndDate(Authentication authentication,
                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                     @RequestParam(value = "from")
                                                             LocalDate from,
                                                            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                     @RequestParam(value = "to")
                                                             LocalDate to){
        logger.debug("Received GET request with params: from={}, to={}", from, to);
        return scheduleService.findAllEmployeeScheduleByAuthAndDate(authentication, from, to);
    }

    @RequestMapping(method = RequestMethod.POST,
                    value = "/generate")
    public ResponseEntity<?> generate(@Valid @RequestBody ScheduleGenerationDTO scheduleGenerationDTO) {
        scheduleGenerationService.generate(
                scheduleGenerationDTO.getShiftId(),
                scheduleGenerationDTO.getFrom(),
                scheduleGenerationDTO.getTo(),
                scheduleGenerationDTO.getOffset());
        String body = "Schedule " + scheduleGenerationDTO.toString() + " was successfully generated";
        logger.debug(body);
        return ResponseEntity.ok(body);
    }
}
