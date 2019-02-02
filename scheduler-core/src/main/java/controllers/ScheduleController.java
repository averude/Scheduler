package controllers;

import entity.WorkDay;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;

@RequestMapping("/api/v1/")
public interface ScheduleController {
    @RequestMapping(method = RequestMethod.POST,
                    value = "schedule/{employeeId}")
    ResponseEntity<Iterable<WorkDay>> create(
            @RequestHeader("Department-ID") long departmentId,
            @PathVariable long employeeId,
            @Valid @RequestBody Iterable<WorkDay> schedule);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "schedule/{employeeId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long employeeId,
                             @Valid @RequestBody Iterable<WorkDay> schedule);

    @RequestMapping(method = RequestMethod.GET,
                    value = "schedule/search")
    Iterable<WorkDay> searchInEmployee(@RequestParam(value = "employeeId", required = true)
                                               Long employeeId,
                                       @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                       @RequestParam(value = "from", required = true)
                                               LocalDate from,
                                       @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                       @RequestParam(value = "to", required = false)
                                               LocalDate to);
}
