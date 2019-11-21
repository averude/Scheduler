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
                                  List<ExtraWeekend> extraWeekends) {
        var schedule = new ArrayList<>(existingSchedule);

        var holidayUnit = getNewHolidayOrWeekendUnit(pattern.getHolidayDayType());
        var weekendUnit = getNewHolidayOrWeekendUnit(pattern.getExtraWeekendDayType());

        var dates = interval.getFrom()
                .datesUntil(interval.getTo().plusDays(1))
                .collect(Collectors.toList());

        int datesSize = dates.size();
        int unitsSize = pattern.getSequence().size();

        for (int i = 0, scheduleIndex = 0; i < datesSize; i+=unitsSize) {
            for (int j = 0; j < unitsSize; j++) {
                int dateIndex = i + j;
                if (dateIndex >= datesSize) {
                    break;
                }

                var unitIndex = ((int) interval.getOffset() + j) % unitsSize;

                var date = dates.get(dateIndex);
                var unit = pattern.getSequence().get(unitIndex);

                var workDay = getExistingWorkDay(schedule, scheduleIndex);

                var isHoliday = isHoliday(holidays, date);
                var isWeekend = isExtraWeekend(extraWeekends, date);

                setPatternUnit(unit, holidayUnit, weekendUnit, isHoliday, isWeekend);

                if (workDay != null && date.equals(workDay.getDate())) {
                    scheduleIndex++;
                    updateWorkDay(workDay, unit, isHoliday);
                } else {
                    schedule.add(createWorkDay(interval.getEmployeeId(), unit, date, isHoliday));
                }
            }
        }
        logger.trace("Schedule generated. Returning result...");
        return schedule;
    }

    private void updateWorkDay(WorkDay workDay,
                               PatternUnit unit,
                               boolean isHoliday) {
        if (workDay.getId() != null) {
            logger.trace("Updating workday " + workDay);
        }
        workDay.setDayTypeId(unit.getDayTypeId());
        workDay.setHours(unit.getValue());
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
        logger.trace("Creating workday " + workDay);
        return workDay;
    }

    private void setPatternUnit(PatternUnit currentUnit,
                                PatternUnit holidayUnit,
                                PatternUnit weekendUnit,
                                boolean isHoliday,
                                boolean isWeekend) {
        if (holidayUnit != null && isHoliday) {
            logger.trace("Holiday found. Setting pattern unit to holiday's");
            currentUnit = holidayUnit;
        }

        if (weekendUnit != null && isWeekend) {
            logger.trace("Extra weekend found. Setting pattern unit to extra weekend's");
            currentUnit = weekendUnit;
        }
    }

    private WorkDay getExistingWorkDay(ArrayList<WorkDay> schedule, int scheduleIndex) {
        if (scheduleIndex < schedule.size()) {
            return schedule.get(scheduleIndex);
        }
        return null;
    }

    private PatternUnit getNewHolidayOrWeekendUnit(DayType dayType) {
        if (dayType != null) {
            return new PatternUnit(0L, 0L, dayType.getId(), dayType.getDefaultValue());
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
}
