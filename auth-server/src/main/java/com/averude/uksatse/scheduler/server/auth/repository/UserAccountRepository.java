package com.averude.uksatse.scheduler.server.auth.repository;

import com.averude.uksatse.scheduler.security.model.entity.UserAccount;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserAccountRepository extends JpaRepository<UserAccount, Long> {

    @EntityGraph(value = "graph.UserAccount.accountShifts")
    List<UserAccount> findAllByAuthority(String authority);

    @EntityGraph(value = "graph.UserAccount.accountShifts")
    List<UserAccount> findAllByEnterpriseIdAndAuthority(Long enterpriseId, String authority);

    @EntityGraph(value = "graph.UserAccount.accountShifts")
    List<UserAccount> findAllByDepartmentIdAndAuthority(Long departmentId, String authority);

    @EntityGraph(value = "graph.UserAccount.accountShifts")
    Optional<UserAccount> findByUsername(String username);
}
