package com.averude.uksatse.scheduler.microservice.workschedule.shared.repository;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.entity.ReportSheet;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.QueryHints;

import javax.persistence.QueryHint;
import java.util.List;

public interface ReportSheetRepository extends JpaRepository<ReportSheet, Long> {
    @QueryHints(value = {
            @QueryHint(name = org.hibernate.annotations.QueryHints.READ_ONLY, value = "true")
    }, forCounting = false)
    @EntityGraph("graph.ReportSheet.reportSheetShifts")
    List<ReportSheet> findAllByDepartmentId(Long departmentId);
}
