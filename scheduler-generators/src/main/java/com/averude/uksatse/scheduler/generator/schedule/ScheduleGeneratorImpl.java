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

                var unit = getPatternUnit(pattern, unitIndex, date, holidays, extraWeekends, extraWorkDays);
                var workDay = getExistingWorkDay(schedule, scheduleIndex);

                if (workDay != null && date.equals(workDay.getDate())) {
                    scheduleIndex++;
                    updateWorkDay(workDay, unit);
                } else {
                    schedule.add(createWorkDay(interval.getEmployeeId(), unit, date));
                }
            }
        }
        return schedule;
    }

    private void updateWorkDay(WorkDay workDay,
                               HasDayTypeIdAndTime unit) {
        if (workDay.getId() != null) {
            log.trace("Updating workday {}", workDay);
        }
        workDay.setDayTypeId(unit.getDayTypeId());
        workDay.setStartTime(unit.getStartTime());
        workDay.setEndTime(unit.getEndTime());
        workDay.setBreakStartTime(unit.getBreakStartTime());
        workDay.setBreakEndTime(unit.getBreakEndTime());
    }

    private WorkDay createWorkDay(Long employeeId,
                                  HasDayTypeIdAndTime unit,
                                  LocalDate date) {
        var workDay = new WorkDay();
        workDay.setEmployeeId(employeeId);
        workDay.setDate(date);
        updateWorkDay(workDay, unit);
        log.trace("Creating workday {}", workDay);
        return workDay;
    }

    private HasDayTypeIdAndTime getPatternUnit(ShiftPattern pattern,
                                               int unitIndex,
                                               LocalDate date,
                                               List<? extends HasDate> holidays,
                                               List<? extends HasDate> extraWeekends,
                                               List<? extends HasDate> extraWorkDays) {
        var holidayDepDayType = pattern.getHolidayDepDayType();
        if (holidayDepDayType != null && isDateFromList(holidays, date)) {
            return holidayDepDayType;
        }

        var extraWeekendDepDayType = pattern.getExtraWeekendDepDayType();
        if (extraWeekendDepDayType != null && isDateFromList(extraWeekends, date)) {
            return extraWeekendDepDayType;
        }

        var extraWorkDayDepDayType = pattern.getExtraWorkDayDepDayType();
        if (extraWeekendDepDayType != null && isDateFromList(extraWorkDays, date)) {
            return extraWorkDayDepDayType;
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
