package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.dto.BasicDto;
import com.averude.uksatse.scheduler.core.dto.ScheduleGenerationDTO;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentOrShiftAdmin;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RequestMapping("/schedule")
public interface ScheduleController {
    @IsDepartmentOrShiftAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Iterable<WorkDay>> create(@Valid @RequestBody Iterable<WorkDay> schedule);

    @IsDepartmentOrShiftAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(@Valid @RequestBody Iterable<WorkDay> schedule);

    @IsDepartmentOrShiftAdmin
    @RequestMapping(method = RequestMethod.GET,
                    value = "/dates")
    List<BasicDto<Employee, WorkDay>> getAllByAuthAndDate(Authentication authentication,
                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                              @RequestParam(value = "from")
                                                                      LocalDate from,
                                                              @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                              @RequestParam(value = "to")
                                                                      LocalDate to);

    @IsDepartmentOrShiftAdmin
    @RequestMapping(method = RequestMethod.POST,
                    value = "/generate")
    ResponseEntity<?> generate(@Valid @RequestBody ScheduleGenerationDTO scheduleGenerationDTO);
}
