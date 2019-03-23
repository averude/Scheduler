package com.averude.uksatse.scheduler.core.generator;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

@Component
public class ScheduleGeneratorImpl implements ScheduleGenerator {

    @Override
    public List<WorkDay> generate(List<PatternUnit> patternUnits,
                                  List<LocalDate> dates,
                                  long employeeId,
                                  int offset) {
        List<WorkDay> schedule = new LinkedList<>();

        int datesSize = dates.size();
        int unitsSize = patternUnits.size();

        for (int i = 0; i < datesSize; i+=unitsSize) {
            for (int j = 0; j < unitsSize; j++) {
                int dateIndex = i + j;
                if (dateIndex >= datesSize) {
                    break;
                }

                int unitIndex = (offset + j) % unitsSize;
                schedule.add(new WorkDay(
                        employeeId,
                        patternUnits.get(unitIndex).getDayTypeId(),
                        false,
                        patternUnits.get(unitIndex).getValue(),
                        patternUnits.get(unitIndex).getLabel(),
                        dates.get(dateIndex)));
            }
        }

        return schedule;
    }
}
