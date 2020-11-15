package com.averude.uksatse.scheduler.server.auth.repository;

import com.averude.uksatse.scheduler.security.entity.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    @Query("select u " +
            "from user_accounts u " +
            "inner join Department d " +
            "on u.departmentId = d.id " +
            "where d.enterpriseId = ?1")
    List<UserAccount> findAllByEnterpriseId(Long enterpriseId);

    @Query("select u " +
            "from user_accounts u " +
            "inner join Shift s " +
            "on u.shiftId = s.id " +
            "where s.departmentId = ?1")
    List<UserAccount> findAllByDepartmentId(Long departmentId);

    Optional<UserAccount> findByUsername(String username);
}
