package com.averude.uksatse.scheduler.microservice.workschedule.service;

import com.averude.uksatse.scheduler.core.interfaces.service.*;
import com.averude.uksatse.scheduler.core.model.entity.WorkScheduleView;

public interface WorkScheduleViewService extends
        IByEnterpriseIdDtoService<WorkScheduleView, Long, Long>,
        IByEnterpriseIdService<WorkScheduleView, Long>,
        IByDepartmentIdService<WorkScheduleView, Long>,
        IDtoService<WorkScheduleView, Long, Long>,
        IService<WorkScheduleView, Long> {
}
