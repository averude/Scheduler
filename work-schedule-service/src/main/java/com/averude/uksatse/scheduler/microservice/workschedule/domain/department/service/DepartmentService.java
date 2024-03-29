package com.averude.uksatse.scheduler.microservice.workschedule.domain.department.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IByEnterpriseIdService;
import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.department.entity.Department;

public interface DepartmentService extends IByEnterpriseIdService<Department, Long>,
        IService<Department, Long> {
}
