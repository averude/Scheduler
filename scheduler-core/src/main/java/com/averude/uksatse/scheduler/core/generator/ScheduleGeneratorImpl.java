package com.averude.uksatse.scheduler.core.generator;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.*;

@Component
public class ScheduleGeneratorImpl implements ScheduleGenerator {

    @Override
    public List<WorkDay> generate(List<PatternUnit> patternUnits,
                                  List<LocalDate> dates,
                                  List<Holiday> holidays,
                                  List<WorkDay> existingSchedule,
                                  long employeeId,
                                  int offset) {
        List<WorkDay> schedule = new LinkedList<>(existingSchedule);

        int datesSize = dates.size();
        int unitsSize = patternUnits.size();

        for (int i = 0; i < datesSize; i+=unitsSize) {
            for (int j = 0; j < unitsSize; j++) {
                int dateIndex = i + j;
                if (dateIndex >= datesSize) {
                    break;
                }

                int unitIndex = (offset + j) % unitsSize;

                LocalDate date = dates.get(dateIndex);
                Holiday holiday = holidays.stream()
                        .filter(value -> value.getDate().equals(date))
                        .findAny()
                        .orElse(null);
                PatternUnit unit = patternUnits.get(unitIndex);

                Optional<WorkDay> optionalWorkDay = schedule.stream()
                        .filter(workDay -> workDay.getDate().equals(date))
                        .findAny();

                // VERY Ugly decision, but ifNotPresent is available only in Java 9
                // so it would stay here until project's JDK put
                if (optionalWorkDay.isPresent()) {
                    updateWorkDay(optionalWorkDay.get(), unit, holiday);
                } else {
                    schedule.add(createWorkDay(employeeId, unit, date, holiday));
                }
            }
        }
        return schedule;
    }

    private void updateWorkDay(WorkDay workDay,
                               PatternUnit unit,
                               Holiday holiday) {
        workDay.setDayTypeId(unit.getDayTypeId());
        workDay.setHours(unit.getValue());
        if (holiday != null) {
            workDay.setHoliday(true);
        } else {
            workDay.setHoliday(false);
        }
    }

    private WorkDay createWorkDay(Long employeeId,
                                  PatternUnit unit,
                                  LocalDate date,
                                  Holiday holiday) {
        WorkDay workDay = new WorkDay();
        workDay.setEmployeeId(employeeId);
        workDay.setDate(date);
        updateWorkDay(workDay, unit, holiday);
        return workDay;
    }
}
