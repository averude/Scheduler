package com.averude.uksatse.scheduler.microservice.workschedule.domain.united.service;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.daytype.service.DayTypeService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.employee.service.EmployeeService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.position.service.PositionService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.shift.service.ShiftService;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.united.dto.CommonDataDTO;
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
