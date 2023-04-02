package com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasShiftId;

public interface Composition extends HasDepartmentId, HasShiftId, HasPositionId, HasEmployeeId, HasDateDuration {

}
