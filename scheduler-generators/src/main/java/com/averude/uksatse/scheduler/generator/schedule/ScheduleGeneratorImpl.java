package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDate;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDayTypeIdAndTime;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class ScheduleGeneratorImpl implements ScheduleGenerator {

    @Override
    public List<WorkDay> generate(ScheduleGenerationInterval interval,
                                  ShiftPattern pattern,
                                  List<WorkDay> existingSchedule,
                                  List<Holiday> holidays,
                                  List<ExtraWeekend> extraWeekends,
                                  List<ExtraWorkDay> extraWorkDays) {
        var schedule = new ArrayList<>(existingSchedule);

        var dates = interval.getFrom()
                .datesUntil(interval.getTo().plusDays(1))
                .collect(Collectors.toList());

        int datesSize = dates.size();
        int unitsSize = pattern.getSequence().size();
        var offset    = interval.getOffset();

        for (int i = 0, scheduleIndex = 0; i < datesSize; i+=unitsSize) {
            for (int j = 0; j < unitsSize; j++) {
                int dateIndex = i + j;
                if (dateIndex >= datesSize) {
                    break;
                }

                var unitIndex = ((int) offset + j) % unitsSize;

                var date = dates.get(dateIndex);

                var isHoliday      = isDateFromList(holidays, date);
                var isExtraWeekend = isDateFromList(extraWeekends, date);
                var isExtraWorkDay = isDateFromList(extraWorkDays, date);

                var unit = getPatternUnit(pattern, unitIndex,
                        pattern.getHolidayDepDayType(), pattern.getExtraWeekendDepDayType(),
                        pattern.getExtraWorkDayDepDayType(),
                        isHoliday, isExtraWeekend, isExtraWorkDay);

                var workDay = getExistingWorkDay(schedule, scheduleIndex);

                if (workDay != null && date.equals(workDay.getDate())) {
                    scheduleIndex++;
                    updateWorkDay(workDay, unit, isHoliday);
                } else {
                    schedule.add(createWorkDay(interval.getEmployeeId(), unit, date, isHoliday));
                }
            }
        }
        return schedule;
    }

    private void updateWorkDay(WorkDay workDay,
                               HasDayTypeIdAndTime unit,
                               boolean isHoliday) {
        if (workDay.getId() != null) {
            log.trace("Updating workday {}", workDay);
        }
        workDay.setDayTypeId(unit.getDayTypeId());
        workDay.setStartTime(unit.getStartTime());
        workDay.setEndTime(unit.getEndTime());
        workDay.setBreakStartTime(unit.getBreakStartTime());
        workDay.setBreakEndTime(unit.getBreakEndTime());
        workDay.setHoliday(isHoliday);
    }

    private WorkDay createWorkDay(Long employeeId,
                                  HasDayTypeIdAndTime unit,
                                  LocalDate date,
                                  boolean isHoliday) {
        var workDay = new WorkDay();
        workDay.setEmployeeId(employeeId);
        workDay.setDate(date);
        updateWorkDay(workDay, unit, isHoliday);
        log.trace("Creating workday {}", workDay);
        return workDay;
    }

    private HasDayTypeIdAndTime getPatternUnit(ShiftPattern pattern,
                                               int unitIndex,
                                               HasDayTypeIdAndTime holidayUnit,
                                               HasDayTypeIdAndTime weekendUnit,
                                               HasDayTypeIdAndTime workDayUnit,
                                               boolean isHoliday,
                                               boolean isExtraWeekend,
                                               boolean isExtraWorkDay) {

        if (holidayUnit != null && isHoliday) {
            log.trace("Holiday found. Setting pattern unit to holiday's");
            return holidayUnit;
        }

        if (weekendUnit != null && isExtraWeekend) {
            log.trace("Extra weekend found. Setting pattern unit to an extra weekend's");
            return weekendUnit;
        }

        if (workDayUnit != null && isExtraWorkDay) {
            log.trace("Extra work day found. Setting pattern unit to an extra work day's");
            return workDayUnit;
        }

        return pattern.getSequence().get(unitIndex);
    }

    private WorkDay getExistingWorkDay(ArrayList<WorkDay> schedule, int scheduleIndex) {
        if (scheduleIndex < schedule.size()) {
            return schedule.get(scheduleIndex);
        }
        return null;
    }

    private boolean isDateFromList(List<? extends HasDate> hasDateList, LocalDate date) {
        return hasDateList.stream().anyMatch(value -> value.getDate().equals(date));
    }
}
