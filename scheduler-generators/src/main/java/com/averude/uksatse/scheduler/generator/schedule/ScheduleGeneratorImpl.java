package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class ScheduleGeneratorImpl implements ScheduleGenerator {

    private static Logger logger = LoggerFactory.getLogger(ScheduleGenerator.class);

    @Override
    public List<WorkDay> generate(ScheduleGenerationInterval interval,
                                  ShiftPattern pattern,
                                  List<WorkDay> existingSchedule,
                                  List<Holiday> holidays,
                                  List<ExtraWeekend> extraWeekends,
                                  List<ExtraWorkDay> extraWorkDays) {
        var schedule = new ArrayList<>(existingSchedule);

        var holidayUnit = getPatternUnitByDayType(pattern.getHolidayDayType());
        var extraWeekendUnit = getPatternUnitByDayType(pattern.getExtraWeekendDayType());
        var extraWorkDayUnit = getPatternUnitByDayType(pattern.getExtraWorkDayDayType());

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

                var isHoliday      = isHoliday(holidays, date);
                var isExtraWeekend = isExtraWeekend(extraWeekends, date);
                var isExtraWorkDay = isExtraWorkDay(extraWorkDays, date);

                var unit = getPatternUnit(pattern, unitIndex,
                        holidayUnit, extraWeekendUnit, extraWorkDayUnit,
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
                               PatternUnit unit,
                               boolean isHoliday) {
        if (workDay.getId() != null) {
            logger.trace("Updating workday {}", workDay);
        }
        workDay.setDayTypeId(unit.getDayTypeId());
        workDay.setStartTime(unit.getStartTime());
        workDay.setEndTime(unit.getEndTime());
        workDay.setBreakStartTime(unit.getBreakStartTime());
        workDay.setBreakEndTime(unit.getBreakEndTime());
        workDay.setHoliday(isHoliday);
    }

    private WorkDay createWorkDay(Long employeeId,
                                  PatternUnit unit,
                                  LocalDate date,
                                  boolean isHoliday) {
        var workDay = new WorkDay();
        workDay.setEmployeeId(employeeId);
        workDay.setDate(date);
        updateWorkDay(workDay, unit, isHoliday);
        logger.trace("Creating workday {}", workDay);
        return workDay;
    }

    private PatternUnit getPatternUnit(ShiftPattern pattern,
                                       int unitIndex,
                                       PatternUnit holidayUnit,
                                       PatternUnit weekendUnit,
                                       PatternUnit workDayUnit,
                                       boolean isHoliday,
                                       boolean isExtraWeekend,
                                       boolean isExtraWorkDay) {

        if (holidayUnit != null && isHoliday) {
            logger.trace("Holiday found. Setting pattern unit to holiday's");
            return holidayUnit;
        }

        if (weekendUnit != null && isExtraWeekend) {
            logger.trace("Extra weekend found. Setting pattern unit to an extra weekend's");
            return weekendUnit;
        }

        if (workDayUnit != null && isExtraWorkDay) {
            logger.trace("Extra work day found. Setting pattern unit to an extra work day's");
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

    private PatternUnit getPatternUnitByDayType(DayType dayType) {
        if (dayType != null) {
            var unit = new PatternUnit(0L, 0L, dayType.getId());
            unit.setStartTime(dayType.getStartTime());
            unit.setEndTime(dayType.getEndTime());
            unit.setBreakStartTime(dayType.getBreakStartTime());
            unit.setBreakEndTime(dayType.getBreakEndTime());
            return unit;
        } else {
            return null;
        }
    }

    private boolean isExtraWeekend(List<ExtraWeekend> extraWeekends, LocalDate date) {
        return extraWeekends.stream()
                .anyMatch(extraWeekend -> extraWeekend.getDate().equals(date));
    }

    private boolean isHoliday(List<Holiday> holidays, LocalDate date) {
        return holidays.stream()
                .anyMatch(value -> value.getDate().equals(date));
    }

    private boolean isExtraWorkDay(List<ExtraWorkDay> extraWorkDays, LocalDate date) {
        return extraWorkDays.stream()
                .anyMatch(value -> value.getDate().equals(date));
    }
}
