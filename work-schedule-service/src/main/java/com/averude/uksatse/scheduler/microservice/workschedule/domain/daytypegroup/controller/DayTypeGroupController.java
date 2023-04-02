package com.averude.uksatse.scheduler.microservice.workschedule.domain.daytypegroup.controller;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytypegroup.entity.DayTypeGroup;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytypegroup.service.DayTypeGroupService;
import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RequestMapping("/day_type_groups")
@RestController
@RequiredArgsConstructor
public class DayTypeGroupController {

    private final DayTypeGroupService dayTypeGroupService;

    @Logged
    @GetMapping
    public List<DayTypeGroup> getAll() {
        return dayTypeGroupService.findAll();
    }

    @Logged
    @IsGlobalAdmin
    @PostMapping
    public DayTypeGroup post(@RequestBody @Valid DayTypeGroup dayTypeGroup) {
        return dayTypeGroupService.save(dayTypeGroup);
    }

    @Logged
    @IsGlobalAdmin
    @PutMapping
    public DayTypeGroup put(@RequestBody @Valid DayTypeGroup dayTypeGroup) {
        return dayTypeGroupService.save(dayTypeGroup);
    }

    @Logged
    @IsGlobalAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        dayTypeGroupService.deleteById(id);
    }
}
