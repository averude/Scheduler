package com.averude.uksatse.scheduler.monolith.controller;

import com.averude.uksatse.scheduler.core.controller.ScheduleController;
import com.averude.uksatse.scheduler.core.dto.ScheduleDTO;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.monolith.service.ScheduleGenerationService;
import com.averude.uksatse.scheduler.shared.service.ScheduleService;
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
        return ResponseEntity.ok(schedule);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT)
    public ResponseEntity<?> update(@Valid @RequestBody Iterable<WorkDay> schedule) {
        scheduleService.saveAll(schedule);
        return ResponseEntity.ok("WorkDay was successfully updated");
    }

    @RequestMapping(method = RequestMethod.GET,
            value = "/dates")
    public Iterable<ScheduleDTO> searchByAuthAndDate(Authentication authentication,
                                                     @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                     @RequestParam(value = "from")
                                                             LocalDate from,
                                                     @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                     @RequestParam(value = "to")
                                                             LocalDate to){
        return scheduleService.findAllByAuthAndDate(authentication, from, to);
    }

    @RequestMapping(method = RequestMethod.POST,
                    value = "/generate")
    public ResponseEntity<?> generate(@RequestParam(value = "shiftId")
                                              Long shiftId,
                                      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                      @RequestParam(value = "from")
                                              LocalDate from,
                                      @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                      @RequestParam(value = "to")
                                              LocalDate to,
                                      @RequestParam(value = "offset")
                                              Integer offset) {
        scheduleGenerationService.generate(shiftId, from, to, offset);
        return ResponseEntity.ok("Schedule was successfully generated");
    }
}