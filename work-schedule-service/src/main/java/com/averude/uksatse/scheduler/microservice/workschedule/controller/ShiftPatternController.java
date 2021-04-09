package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.dto.ShiftPatternDTO;
import com.averude.uksatse.scheduler.core.model.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.shared.service.ShiftPatternService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/shift_patterns")
@RestController
@RequiredArgsConstructor
public class ShiftPatternController {

    private final ShiftPatternService shiftPatternService;

    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP2', #departmentId)")
    @GetMapping("/departments/{departmentId}/dto")
    public List<? extends BasicDto<ShiftPattern, PatternUnit>> getAllDtoByDepartmentId(@PathVariable Long departmentId) {
        return shiftPatternService.findAllDtoByDepartmentId(departmentId);
    }

    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #shiftPatternDTO.parent)")
    @PostMapping("/dto")
    public ShiftPatternDTO postDTO(@RequestBody ShiftPatternDTO shiftPatternDTO) {
        return shiftPatternService.saveDTO(shiftPatternDTO);
    }

    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #shiftPatternDTO.parent)")
    @PutMapping("/dto")
    public ShiftPatternDTO putDTO(@RequestBody ShiftPatternDTO shiftPatternDTO) {
        return shiftPatternService.saveDTO(shiftPatternDTO);
    }

    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP2', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<ShiftPattern> getAllByDepartmentId(@PathVariable Long departmentId) {
        return shiftPatternService.findAllByDepartmentId(departmentId);
    }

    @IsDepartmentAdmin
    @DeleteMapping("{id}")
    void delete(@PathVariable Long id) {
        shiftPatternService.deleteById(id);
    }
}
