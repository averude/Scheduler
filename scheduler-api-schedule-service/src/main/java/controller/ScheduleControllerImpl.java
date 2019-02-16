package controller;

import controllers.ScheduleController;
import entity.WorkDay;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.ScheduleService;

import javax.validation.Valid;
import java.time.LocalDate;

@RestController
public class ScheduleControllerImpl implements ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleControllerImpl(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @Override
    @RequestMapping(method = RequestMethod.POST,
                    value = "/{employeeId}")
    public ResponseEntity<Iterable<WorkDay>> create(
            @RequestHeader("Department-ID") Long departmentId,
            @PathVariable Long employeeId,
            @Valid @RequestBody Iterable<WorkDay> schedule){
        scheduleService.saveAll(schedule);
        return ResponseEntity.ok(schedule);
    }

    @Override
    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{employeeId}")
    public ResponseEntity<?> update(@RequestHeader("Department-ID") Long departmentId,
                                    @PathVariable Long employeeId,
                                    @Valid @RequestBody Iterable<WorkDay> schedule) {
        scheduleService.saveAll(schedule);
        return ResponseEntity.ok("WorkDay was successfully updated");
    }

    @Override
    @RequestMapping(method = RequestMethod.GET,
                    value = "/search")
    public Iterable<WorkDay> searchInEmployee(@RequestParam(value = "employeeId", required = true)
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