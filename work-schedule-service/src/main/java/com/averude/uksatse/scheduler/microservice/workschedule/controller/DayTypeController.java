package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.entity.DayType;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.DayTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/day_types")
@RestController
@RequiredArgsConstructor
public class DayTypeController {

    private final DayTypeService dayTypeService;

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP2', #enterpriseId)")
    @GetMapping("/enterprises/{enterpriseId}")
    public List<DayType> findAllByEnterpriseId(@PathVariable Long enterpriseId) {
        return dayTypeService.findAllByEnterpriseId(enterpriseId);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #dayType)")
    @PostMapping
    public DayType post(@RequestBody DayType dayType) {
        return dayTypeService.save(dayType);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #dayType)")
    @PutMapping
    public DayType put(@RequestBody DayType dayType) {
        return dayTypeService.save(dayType);
    }

    @Logged
    @IsEnterpriseAdmin
    @DeleteMapping
    public void delete(@PathVariable Long id) {
        dayTypeService.deleteById(id);
    }

}
