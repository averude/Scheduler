package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.dto.ReportSheetDTO;
import com.averude.uksatse.scheduler.security.annotations.IsDepartmentAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.ReportSheetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/report_sheets")
@RestController
@RequiredArgsConstructor
public class ReportSheetController {

    private final ReportSheetService reportSheetService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP2', #departmentId)")
    @GetMapping("/departments/{departmentId}")
    public List<ReportSheetDTO> getAllByDepartmentId(@PathVariable Long departmentId) {
        return reportSheetService.findAllByDepartmentId(departmentId);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #dto.reportSheet)")
    @PostMapping
    public ReportSheetDTO postDTO(ReportSheetDTO dto) {
        return reportSheetService.save(dto);
    }

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP3', #dto.reportSheet)")
    @PutMapping
    public ReportSheetDTO putDTO(ReportSheetDTO dto) {
        return reportSheetService.save(dto);
    }

    @Logged
    @IsDepartmentAdmin
    @DeleteMapping("{id}")
    public void delete(@PathVariable Long id) {
        reportSheetService.deleteById(id);
    }
}
