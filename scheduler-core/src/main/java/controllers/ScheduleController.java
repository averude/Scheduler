package controllers;

import entity.WorkDay;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;

public interface ScheduleController {
    @RequestMapping(method = RequestMethod.POST,
                    value = "/{employeeId}")
    ResponseEntity<Iterable<WorkDay>> create(
            @RequestHeader("Department-ID") Long departmentId,
            @PathVariable Long employeeId,
            @Valid @RequestBody Iterable<WorkDay> schedule);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{employeeId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") Long departmentId,
                             @PathVariable Long employeeId,
                             @Valid @RequestBody Iterable<WorkDay> schedule);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/search")
    Iterable<WorkDay> searchInEmployee(@RequestParam(value = "employeeId", required = true)
                                               Long employeeId,
                                       @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                       @RequestParam(value = "from", required = true)
                                               LocalDate from,
                                       @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                       @RequestParam(value = "to", required = false)
                                               LocalDate to);
}
