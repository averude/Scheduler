package com.averude.uksatse.scheduler.microservice.workschedule.service.united;

import com.averude.uksatse.scheduler.microservice.workschedule.model.AdminCommonDataDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.service.DepartmentDayTypeService;
import com.averude.uksatse.scheduler.microservice.workschedule.service.ShiftPatternService;
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
