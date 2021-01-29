package com.averude.uksatse.scheduler.server.auth.repository;

import com.averude.uksatse.scheduler.security.model.entity.UserAccountShift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAccountShiftRepository extends JpaRepository<UserAccountShift, UserAccountShift.PK> {

    void deleteAllByUserAccountIdAndShiftIdNotIn(Long accountId, List<Long> shiftIds);
}
