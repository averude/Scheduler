package com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.service;

import com.averude.uksatse.scheduler.core.interfaces.service.IService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.dto.ReportSheetDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.reportsheet.entity.ReportSheet;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface ReportSheetService extends IService<ReportSheet, Long> {
    @Transactional
    List<ReportSheetDTO> findAllByDepartmentId(Long departmentId);

    @Transactional
    ReportSheetDTO save(ReportSheetDTO dto);
}
