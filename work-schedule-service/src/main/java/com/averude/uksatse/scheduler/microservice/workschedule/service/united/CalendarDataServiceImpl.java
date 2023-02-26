package com.averude.uksatse.scheduler.microservice.workschedule.service.united;

import com.averude.uksatse.scheduler.microservice.workschedule.model.CalendarDataDTO;
import com.averude.uksatse.scheduler.microservice.workschedule.service.ScheduleService;
import com.averude.uksatse.scheduler.microservice.workschedule.service.SpecialCalendarDateService;
import com.averude.uksatse.scheduler.microservice.workschedule.service.WorkingNormService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CalendarDataServiceImpl implements CalendarDataService {

    private final ScheduleService scheduleService;
    private final WorkingNormService workingNormService;
    private final SpecialCalendarDateService specialCalendarDateService;

    @Override
    public CalendarDataDTO getByDepartmentId(Long enterpriseId,
                                             Long departmentId,
                                             LocalDate from,
                                             LocalDate to) {
        var scheduleDTOs = scheduleService.findAllDTOByDepartmentIdAndDate(departmentId, from, to);
        var workingNorms = workingNormService.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
        var specialCalendarDates =
                specialCalendarDateService.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);

        return new CalendarDataDTO(scheduleDTOs, workingNorms, specialCalendarDates);
    }

    @Override
    public CalendarDataDTO getByShiftIds(Long enterpriseId,
                                         Long departmentId,
                                         List<Long> shiftIds,
                                         LocalDate from,
                                         LocalDate to) {
        var scheduleDTOs = scheduleService.findScheduleDTOByShiftIdsAndDate(shiftIds, from, to);
        var workingNorms = workingNormService.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
        var specialCalendarDates =
                specialCalendarDateService.findAllByEnterpriseIdAndDateBetween(enterpriseId, from, to);

        return new CalendarDataDTO(scheduleDTOs, workingNorms, specialCalendarDates);
    }
}
