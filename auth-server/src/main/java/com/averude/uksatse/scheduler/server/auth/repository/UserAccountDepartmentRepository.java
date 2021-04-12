package com.averude.uksatse.scheduler.server.auth.repository;

import com.averude.uksatse.scheduler.security.model.entity.UserAccountDepartment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAccountDepartmentRepository extends JpaRepository<UserAccountDepartment, UserAccountDepartment.PK> {
    void deleteAllByUserAccountIdAndDepartmentIdNotIn(Long accountId, List<Long> departmentIds);
}
