package com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.controller;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.service.SpecialCalendarDateService;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.time.LocalDate;
import java.util.List;

@RequestMapping("/special_calendar_dates")
@RestController
@RequiredArgsConstructor
public class SpecialCalendarDateController {

    private final SpecialCalendarDateService specialCalendarDateService;

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP2', #enterpriseId)")
    @GetMapping("/enterprises/{enterpriseId}")
    public List<SpecialCalendarDate> getAllByEnterpriseId(@PathVariable Long enterpriseId,
                                                          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                           @RequestParam(value = "from")
                                                                   LocalDate from,
                                                          @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
                                                           @RequestParam(value = "to")
                                                                   LocalDate to) {
        return specialCalendarDateService.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #specialCalendarDate)")
    @PostMapping
    public SpecialCalendarDate post(@RequestBody @Valid SpecialCalendarDate specialCalendarDate) {
        return specialCalendarDateService.save(specialCalendarDate);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #specialCalendarDate)")
    @PutMapping
    public SpecialCalendarDate put(@RequestBody @Valid SpecialCalendarDate specialCalendarDate) {
        return specialCalendarDateService.save(specialCalendarDate);
    }

    @Logged
    @IsEnterpriseAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        specialCalendarDateService.deleteById(id);
    }
}
