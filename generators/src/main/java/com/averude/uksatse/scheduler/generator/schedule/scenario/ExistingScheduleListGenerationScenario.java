package com.averude.uksatse.scheduler.generator.schedule.scenario;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.generator.model.GenerationInterval;

import java.util.List;
import java.util.stream.Collectors;

import static com.averude.uksatse.scheduler.generator.utils.GenerationUtils.*;

public class ExistingScheduleListGenerationScenario implements GenerationScenario {

    public WorkDay[] generate(GenerationInterval<Employee> interval,
                              List<PatternUnit> sequence,
                              List<WorkDay> schedule) {
        if (schedule.isEmpty()) {
            throw new IllegalArgumentException();
        }

        var dates = interval.datesBetween().collect(Collectors.toList());

        int datesSize = dates.size();
        int unitsSize = sequence.size();
        var offset    = interval.getOffset();

        var result = new WorkDay[datesSize];

        for (int i = 0, scheduleIndex = 0; i < datesSize; i+=unitsSize) {
            for (int j = 0; j < unitsSize; j++) {
                int dateIndex = i + j;
                if (dateIndex >= datesSize) {
                    break;
                }

                var unitIndex = ((int) offset + j) % unitsSize;

                var date = dates.get(dateIndex);

                var unit = sequence.get(unitIndex);

                var existingWorkDay = getValueFromList(schedule, scheduleIndex)
                        .filter(workDay -> workDay.getDate().equals(date));

                if (existingWorkDay.isPresent()) {
                    var workDay = existingWorkDay.get();
                    updateWorkDay(workDay, unit);
                    result[dateIndex] = workDay;
                    scheduleIndex++;
                } else {
                    var workDay = createWorkDay(interval.getObject(), unit, date);
                    result[dateIndex] = workDay;
                }
            }
        }

        return result;
    }
}
