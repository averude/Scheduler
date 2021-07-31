package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.entity.DayTypeGroup;
import com.averude.uksatse.scheduler.security.annotations.IsGlobalAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.DayTypeGroupService;
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
