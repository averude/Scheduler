package com.averude.uksatse.scheduler.controllers.interfaces;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.dto.GenerationDTO;
import com.averude.uksatse.scheduler.core.model.entity.Employee;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentOrShiftAdmin;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentOrShiftUser;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

@RequestMapping("/schedule")
public interface ScheduleController {
    @IsDepartmentOrShiftAdmin
    @RequestMapping(method = RequestMethod.POST)
    ResponseEntity<Iterable<WorkDay>> create(@RequestBody Collection<WorkDay> schedule,
                                             Authentication authentication);

    @IsDepartmentOrShiftAdmin
    @RequestMapping(method = RequestMethod.PUT)
    ResponseEntity<?> update(@RequestBody Collection<WorkDay> schedule,
                             Authentication authentication);

    @IsDepartmentOrShiftUser
    @RequestMapping(method = RequestMethod.GET,
                    value = "/dates")
    List<? extends BasicDto<Employee, WorkDay>> getAllByAuthAndDate(Authentication authentication,
                                                  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                  @RequestParam(value = "from")
                                                          LocalDate from,
                                                  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                  @RequestParam(value = "to")
                                                          LocalDate to);

    @IsDepartmentOrShiftAdmin
    @RequestMapping(method = RequestMethod.POST,
                    value = "/generate")
    ResponseEntity<?> generate(@Valid @RequestBody GenerationDTO generationDTO);

    @PreAuthorize("userPermissionChecker.checkDepartmentUser(authentication, departmentId)")
    @GetMapping("/department/{departmentId}/dates")
    List<? extends BasicDto<Employee, WorkDay>> getAllByDepartmentId(Authentication authentication,
                                                                     @PathVariable Long departmentId,
                                                                     @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                     @RequestParam(value = "from")
                                                                              LocalDate from,
                                                                     @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                     @RequestParam(value = "to")
                                                                              LocalDate to);

    @PreAuthorize("userPermissionChecker.checkShiftUser(authentication, shiftIds)")
    @GetMapping("/shift/{shiftIds}/dates")
    List<? extends BasicDto<Employee, WorkDay>> getAllByShiftIds(Authentication authentication,
                                                                 @PathVariable List<Long> shiftIds,
                                                                 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                 @RequestParam(value = "from")
                                                                         LocalDate from,
                                                                 @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                                 @RequestParam(value = "to")
                                                                         LocalDate to);
}
