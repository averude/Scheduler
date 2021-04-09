package com.averude.uksatse.scheduler.security.model;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDepartmentId;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasEnterpriseId;

public interface IUser extends HasEnterpriseId, HasDepartmentId {
    String getAuthority();
    String getRole();
}
