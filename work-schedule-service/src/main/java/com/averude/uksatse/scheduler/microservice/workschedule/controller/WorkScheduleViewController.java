package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.WorkScheduleView;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.WorkScheduleViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/views")
@RestController
@RequiredArgsConstructor
public class WorkScheduleViewController {

    private final WorkScheduleViewService workScheduleViewService;

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #enterpriseId)")
    @GetMapping("/dto/enterprises/{enterpriseId}")
    public List<BasicDto<WorkScheduleView, Long>> getAllDTOByEnterpriseId(@PathVariable Long enterpriseId) {
        return workScheduleViewService.findAllDtoByEnterpriseId(enterpriseId);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP7', #enterpriseId)")
    @GetMapping("/enterprises/{enterpriseId}")
    public List<WorkScheduleView> getAllByEnterpriseId(@PathVariable Long enterpriseId) {
        return workScheduleViewService.findAllByEnterpriseId(enterpriseId);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP1', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<WorkScheduleView> getAllByDepartmentId(@PathVariable Long departmentId) {
        return workScheduleViewService.findAllByDepartmentId(departmentId);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #dto.parent.enterpriseId)")
    @PostMapping("/dto")
    public BasicDto<WorkScheduleView, Long> post(@RequestBody BasicDto<WorkScheduleView, Long> dto) {
        return workScheduleViewService.saveDto(dto);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #dto.parent.enterpriseId)")
    @PutMapping("/dto")
    public BasicDto<WorkScheduleView, Long> put(@RequestBody BasicDto<WorkScheduleView, Long> dto) {
        return workScheduleViewService.saveDto(dto);
    }

    @Logged
    @IsEnterpriseAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        workScheduleViewService.deleteById(id);
    }
}
