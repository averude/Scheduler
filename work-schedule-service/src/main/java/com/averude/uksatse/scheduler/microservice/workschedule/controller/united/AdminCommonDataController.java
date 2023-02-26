package com.averude.uksatse.scheduler.microservice.workschedule.controller.united;

import com.averude.uksatse.scheduler.microservice.workschedule.model.AdminCommonDataDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.service.united.AdminCommonDataService;
import com.averude.uksatse.scheduler.security.logging.Logged;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class AdminCommonDataController {

    private final AdminCommonDataService adminCommonDataService;

    @Logged
    @PreAuthorize("@departmentLevelSecurity.hasPermission(authentication, 'MAP1', #departmentId)")
    @GetMapping("/enterprises/{enterpriseId}/departments/{departmentId}/admin_common_data")
    public AdminCommonDataDTO getByEnterpriseIdAndDepartmentId(@PathVariable Long enterpriseId,
                                                               @PathVariable Long departmentId) {
        return adminCommonDataService.getByEnterpriseIdAndDepartmentId(enterpriseId, departmentId);
    }

}
