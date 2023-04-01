package com.averude.uksatse.scheduler.microservice.workschedule.domain.united.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.united.dto.CommonDataDTO;

public interface CommonDataService {
    CommonDataDTO getByEnterpriseIdAndDepartmentId(Long enterpriseId, Long departmentId);
}
