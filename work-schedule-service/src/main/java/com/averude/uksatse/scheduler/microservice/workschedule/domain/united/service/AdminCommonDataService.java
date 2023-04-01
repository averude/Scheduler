package com.averude.uksatse.scheduler.microservice.workschedule.domain.united.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.united.dto.AdminCommonDataDTO;

public interface AdminCommonDataService {
    AdminCommonDataDTO getByEnterpriseIdAndDepartmentId(Long enterpriseId, Long departmentId);
}
