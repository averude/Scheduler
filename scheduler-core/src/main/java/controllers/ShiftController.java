package controllers;

import entity.Shift;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Optional;

@RequestMapping("/api/v1/shifts")
public interface ShiftController {
    @RequestMapping(method = RequestMethod.GET)
    Iterable<Shift> getAll(@RequestHeader("Department-ID") long departmentId);

    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Long> create(@RequestHeader("Department-ID") long departmentId,
                                @Valid @RequestBody Shift shift);

    @RequestMapping(method = RequestMethod.GET,
                    value = "/{shiftId}")
    Optional<Shift> get(@RequestHeader("Department-ID") long departmentId,
                        @PathVariable long shiftId);

    @RequestMapping(method = RequestMethod.DELETE,
                    value = "/{shiftId}")
    ResponseEntity<?> delete(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long shiftId);

    @RequestMapping(method = RequestMethod.PUT,
                    value = "/{shiftId}")
    ResponseEntity<?> update(@RequestHeader("Department-ID") long departmentId,
                             @PathVariable long shiftId,
                             @Valid @RequestBody Shift shift);
}
