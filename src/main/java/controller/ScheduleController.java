package controller;

import entity.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import service.ScheduleService;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.Collection;

@CrossOrigin(origins = "http://localhost:4200")
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
    public ResponseEntity<Collection<Schedule>> create(
                                @PathVariable long employeeId,
                                @Valid @RequestBody Collection<Schedule> schedule
    ){
        for (Schedule workDay: schedule) {
            scheduleService.createInParent(employeeId, workDay);
        }
        return ResponseEntity.ok(schedule);
    }

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{employeeId}")
    public ResponseEntity<?> update(@PathVariable long employeeId,
                                    @Valid @RequestBody Collection<Schedule> schedule) {
//        scheduleService.updateById(schedule.getId(), schedule);
        for (Schedule workDay: schedule) {
            scheduleService.updateById(workDay.getId(), workDay);
        }
        return ResponseEntity.ok("Schedule was successfully updated");
    }

    @RequestMapping(method = RequestMethod.GET,
                    value = "/employee/search")
    public Collection<Schedule> searchInEmployee(@RequestParam(value = "employeeId", required = true)
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