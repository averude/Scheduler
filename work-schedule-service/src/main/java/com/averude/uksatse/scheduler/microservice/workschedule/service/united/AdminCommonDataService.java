package com.averude.uksatse.scheduler.microservice.workschedule.service.united;

import com.averude.uksatse.scheduler.microservice.workschedule.model.AdminCommonDataDTO;

public interface AdminCommonDataService {
    AdminCommonDataDTO getByEnterpriseIdAndDepartmentId(Long enterpriseId, Long departmentId);
}
