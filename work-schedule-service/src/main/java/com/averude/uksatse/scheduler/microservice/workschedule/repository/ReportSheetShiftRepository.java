package com.averude.uksatse.scheduler.microservice.workschedule.repository;

import com.averude.uksatse.scheduler.core.model.entity.ReportSheetShift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReportSheetShiftRepository extends JpaRepository<ReportSheetShift, ReportSheetShift.PK> {

    void deleteAllByReportSheetIdAndShiftIdNotIn(Long reportSheetId, List<Long> shiftIds);
}
