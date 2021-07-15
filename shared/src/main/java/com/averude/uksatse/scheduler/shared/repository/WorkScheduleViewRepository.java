package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.WorkScheduleView;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;
import java.util.Optional;

public interface WorkScheduleViewRepository extends JpaRepository<WorkScheduleView, Long> {
    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph("graph.WorkScheduleView.viewDayTypes")
    Optional<WorkScheduleView> getById(Long id);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph("graph.WorkScheduleView.viewDayTypes")
    List<WorkScheduleView> findAllByEnterpriseId(Long enterpriseId);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    List<WorkScheduleView> getAllByEnterpriseId(Long enterpriseId);

    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    List<WorkScheduleView> findAllByDepartmentId(Long departmentId);
}
