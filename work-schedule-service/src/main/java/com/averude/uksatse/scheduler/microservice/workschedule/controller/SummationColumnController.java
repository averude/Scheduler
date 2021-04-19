package com.averude.uksatse.scheduler.microservice.workschedule.controller;

import com.averude.uksatse.scheduler.core.model.dto.BasicDto;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumn;
import com.averude.uksatse.scheduler.core.model.entity.SummationColumnDayTypeRange;
import com.averude.uksatse.scheduler.security.annotations.IsEnterpriseAdmin;
import com.averude.uksatse.scheduler.security.logging.Logged;
import com.averude.uksatse.scheduler.shared.service.SummationColumnService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/summation_columns/dto")
@RestController
@RequiredArgsConstructor
public class SummationColumnController {

    private final SummationColumnService summationColumnService;

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP2', #enterpriseId)")
    @GetMapping("/enterprises/{enterpriseId}")
    public List<? extends BasicDto<SummationColumn, SummationColumnDayTypeRange>> getAllDtoByEnterpriseId(@PathVariable Long enterpriseId) {
        return summationColumnService.findAllDtoByEnterpriseId(enterpriseId);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #dto.parent)")
    @PostMapping
    public BasicDto<SummationColumn, SummationColumnDayTypeRange> post(BasicDto<SummationColumn, SummationColumnDayTypeRange> dto) {
        return summationColumnService.saveDto(dto);
    }

    @Logged
    @PreAuthorize("@enterpriseLevelSecurity.hasPermission(authentication, 'MAP6', #dto.parent)")
    @PutMapping
    public BasicDto<SummationColumn, SummationColumnDayTypeRange> put(BasicDto<SummationColumn, SummationColumnDayTypeRange> dto) {
        return summationColumnService.saveDto(dto);
    }

    @Logged
    @IsEnterpriseAdmin
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        summationColumnService.deleteById(id);
    }
}
