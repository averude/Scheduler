package controller;

import entity.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import service.ScheduleService;

import javax.validation.Valid;
import java.net.URI;
import java.util.Collection;

@RestController
@RequestMapping("/api/v1/schedule")
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{employeeId}")
    public Collection<Schedule> getSchedule(@PathVariable long employeeId){
        return scheduleService.getCurrentMonth(employeeId);
    }

    @RequestMapping(method = RequestMethod.POST,
                    value = "/{employeeId}")
    public ResponseEntity<?> add(@PathVariable long employeeId,
                                 @Valid @RequestBody Schedule schedule){
        scheduleService.createInParent(employeeId, schedule);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{id}")
                .buildAndExpand(schedule.getId()).toUri();
        return ResponseEntity.created(location).build();
    }
}
