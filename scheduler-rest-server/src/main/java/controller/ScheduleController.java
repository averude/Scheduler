package controller;

import entity.WorkDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.ScheduleService;

import javax.validation.Valid;
import java.time.LocalDate;
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
    public Collection<WorkDay> getSchedule(@PathVariable long employeeId){
        return scheduleService.getCurrentMonth(employeeId);
    }

    @RequestMapping(method = RequestMethod.POST,
                    value = "/{employeeId}")
    public ResponseEntity<Collection<WorkDay>> create(
                                @PathVariable long employeeId,
                                @Valid @RequestBody Collection<WorkDay> schedule){
        scheduleService.createInParent(employeeId, schedule);
        return ResponseEntity.ok(schedule);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{employeeId}")
    public ResponseEntity<?> update(@PathVariable long employeeId,
                                    @Valid @RequestBody Collection<WorkDay> schedule) {
        scheduleService.updateCollection(schedule);
        return ResponseEntity.ok("WorkDay was successfully updated");
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/employee/search")
    public Collection<WorkDay> searchInEmployee(@RequestParam(value = "employeeId", required = true)
                                       Long employeeId,
                                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                       @RequestParam(value = "from", required = true)
                                       LocalDate from,
                                                @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                       @RequestParam(value = "to", required = false)
                                       LocalDate to){
        return scheduleService.getForEmployeeByDate(employeeId, from, to);
    }
}