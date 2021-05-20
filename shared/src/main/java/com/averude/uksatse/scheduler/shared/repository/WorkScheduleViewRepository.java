package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.WorkScheduleView;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WorkScheduleViewRepository extends JpaRepository<WorkScheduleView, Long> {
    @Override
    @EntityGraph("graph.WorkScheduleView.viewDayTypes")
    Optional<WorkScheduleView> findById(Long aLong);

    @EntityGraph("graph.WorkScheduleView.viewDayTypes")
    List<WorkScheduleView> findAllByEnterpriseId(Long enterpriseId);

    List<WorkScheduleView> getAllByEnterpriseId(Long enterpriseId);

    List<WorkScheduleView> findAllByDepartmentId(Long departmentId);
}
