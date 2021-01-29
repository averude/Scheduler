package com.averude.uksatse.scheduler.shared.repository;

import com.averude.uksatse.scheduler.core.model.entity.ReportSheet;
import com.averude.uksatse.scheduler.shared.repository.interfaces.IByDepartmentIdRepository;
import org.springframework.data.jpa.repository.EntityGraph;

import java.util.List;

public interface ReportSheetRepository extends IByDepartmentIdRepository<ReportSheet, Long> {
    @Override
    @EntityGraph("graph.ReportSheet.reportSheetShifts")
    List<ReportSheet> findAllByDepartmentId(Long departmentId);
}
