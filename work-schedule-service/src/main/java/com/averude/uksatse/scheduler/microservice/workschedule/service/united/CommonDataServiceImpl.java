package com.averude.uksatse.scheduler.microservice.workschedule.service.united;

import com.averude.uksatse.scheduler.microservice.workschedule.model.CommonDataDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.service.DayTypeService;
import com.averude.uksatse.scheduler.microservice.workschedule.service.EmployeeService;
import com.averude.uksatse.scheduler.microservice.workschedule.service.PositionService;
import com.averude.uksatse.scheduler.microservice.workschedule.service.ShiftService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommonDataServiceImpl implements CommonDataService {

    private final DayTypeService dayTypeService;
    private final PositionService positionService;
    private final ShiftService shiftService;
    private final EmployeeService employeeService;

    @Override
    public CommonDataDTO getByEnterpriseIdAndDepartmentId(Long enterpriseId, Long departmentId) {
        var dayTypes = dayTypeService.findAllByEnterpriseId(enterpriseId);
        var positions = positionService.findAllByDepartmentId(departmentId);
        var shifts = shiftService.findAllByDepartmentId(departmentId);
        var employees = employeeService.findAllByDepartmentId(departmentId);

        return new CommonDataDTO(dayTypes, positions, shifts, employees);
    }
}
