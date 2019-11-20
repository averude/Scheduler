package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Component
public class ScheduleGeneratorImpl implements ScheduleGenerator {

    @Override
    public List<WorkDay> generate(ScheduleGenerationInterval interval,
                                  List<PatternUnit> units,
                                  List<WorkDay> existingSchedule,
                                  List<Holiday> holidays,
                                  List<ExtraWeekend> extraWeekends) {

        var schedule = new ArrayList<>(existingSchedule);

        var dates = interval.getFrom()
                .datesUntil(interval.getTo().plusDays(1))
                .collect(Collectors.toList());

        int datesSize = dates.size();
        int unitsSize = units.size();

        for (int i = 0, scheduleIndex = 0; i < datesSize; i+=unitsSize) {
            for (int j = 0; j < unitsSize; j++) {
                int dateIndex = i + j;
                if (dateIndex >= datesSize) {
                    break;
                }

                var unitIndex = ((int) interval.getOffset() + j) % unitsSize;

                var date = dates.get(dateIndex);

                var isHoliday = holidays.stream()
                        .anyMatch(value -> value.getDate().equals(date));
                var unit = units.get(unitIndex);

                WorkDay workDay = null;
                if (scheduleIndex < schedule.size()) {
                    workDay = schedule.get(scheduleIndex);
                }

                if (workDay != null && date.equals(workDay.getDate())) {
                    scheduleIndex++;
                    updateWorkDay(workDay, unit, isHoliday);
                } else {
                    // Think about it...
                    schedule.add(createWorkDay(interval.getEmployeeId(), unit, date, isHoliday));
                }
            }
        }
        return schedule;
    }

    private void updateWorkDay(WorkDay workDay,
                               PatternUnit unit,
                               boolean isHoliday) {
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
        return workDay;
    }
}
