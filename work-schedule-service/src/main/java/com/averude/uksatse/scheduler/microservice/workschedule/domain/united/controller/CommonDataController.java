package com.averude.uksatse.scheduler.microservice.workschedule.domain.united.controller;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.united.dto.CommonDataDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.united.service.CommonDataService;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CommonDataController {

    private final CommonDataService commonDataService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP2', #departmentId)")
    @GetMapping("/enterprises/{enterpriseId}/departments/{departmentId}/common_data")
    public CommonDataDTO getByEnterpriseIdAndDepartmentId(@PathVariable Long enterpriseId,
                                                          @PathVariable Long departmentId) {
        return commonDataService.getByEnterpriseIdAndDepartmentId(enterpriseId, departmentId);
    }

}
