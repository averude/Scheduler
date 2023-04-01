package com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.controller;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.service.DayTypeService;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/day_types")
@RestController
@RequiredArgsConstructor
public class DayTypeController {

    private final DayTypeService dayTypeService;

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP2', #enterpriseId)")
    @GetMapping("/enterprises/{enterpriseId}")
    public List<DayType> getAllByEnterpriseId(@PathVariable Long enterpriseId) {
        return dayTypeService.findAllByEnterpriseId(enterpriseId);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #dayType)")
    @PostMapping
    public DayType post(@RequestBody @Valid DayType dayType) {
        return dayTypeService.save(dayType);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #dayType)")
    @PutMapping
    public DayType put(@RequestBody @Valid DayType dayType) {
        return dayTypeService.save(dayType);
    }

    @Logged
    @IsEnterpriseAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        dayTypeService.deleteById(id);
    }

}
