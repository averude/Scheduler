package com.averude.uksatse.scheduler.microservice.workschedule.service.united;

import com.averude.uksatse.scheduler.microservice.workschedule.model.CommonDataDTO;

public interface CommonDataService {
    CommonDataDTO getByEnterpriseIdAndDepartmentId(Long enterpriseId, Long departmentId);
}
