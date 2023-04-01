package com.averude.uksatse.scheduler.microservice.workschedule.domain.united.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.departmentdaytype.service.DepartmentDayTypeService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shiftpattern.service.ShiftPatternService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.united.dto.AdminCommonDataDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AdminCommonDataServiceImpl implements AdminCommonDataService {

    private final ShiftPatternService shiftPatternService;
    private final DepartmentDayTypeService departmentDayTypeService;

    @Override
    public AdminCommonDataDTO getByEnterpriseIdAndDepartmentId(Long enterpriseId,
                                                               Long departmentId) {
        var departmentDayTypes = departmentDayTypeService.findAllByDepartmentId(departmentId);
        var shiftPatterns = shiftPatternService.findAllDtoByDepartmentId(departmentId);

        return new AdminCommonDataDTO(departmentDayTypes, shiftPatterns);
    }
}
