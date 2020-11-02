package com.averude.uksatse.scheduler.generator.schedule;

import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDate;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDayTypeIdAndTime;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.*;

@Slf4j
@Component
public class ScheduleGeneratorImpl implements ScheduleGenerator {

    @Override
    public List<WorkDay> generate(ScheduleGenerationInterval interval,
                                  ShiftPattern pattern,
                                  List<WorkDay> existingSchedule,
                                  List<SpecialCalendarDate> specialCalendarDates) {
        var schedule = new ArrayList<>(existingSchedule);

        var dates = interval.datesBetween().collect(Collectors.toList());

        int datesSize = dates.size();
        int unitsSize = pattern.getSequence().size();
        var offset    = interval.getOffset();

        // The first element is the special date index,
        // the second one is the schedule index
        int[] indices = {0, 0};

        for (int i = 0; i < datesSize; i+=unitsSize) {
            for (int j = 0; j < unitsSize; j++) {
                int dateIndex = i + j;
                if (dateIndex >= datesSize) {
                    break;
                }

                var unitIndex = ((int) offset + j) % unitsSize;

                var date = dates.get(dateIndex);

                var unit = getValue(specialCalendarDates, date, indices, 0)
                        .map(specialDate -> getDepartmentDayType(pattern, specialDate))
                        .orElse(pattern.getSequence().get(unitIndex));

                getValue(schedule, date, indices, 1)
                        .ifPresentOrElse(
                                (workDay) -> updateWorkDay(workDay, unit),
                                () -> schedule.add(createWorkDay(interval.getEmployeeId(), unit, date)));
            }
        }
        return schedule;
    }

    private void updateWorkDay(WorkDay workDay,
                               HasDayTypeIdAndTime unit) {
        if (workDay.getId() != null) {
            log.trace("Updating workday {} by unit {}", workDay, unit);
        }
        workDay.setScheduledDayTypeId(unit.getDayTypeId());
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

    private <T extends HasDate> Optional<T> getValue(List<T> values,
                                                     LocalDate date,
                                                     int[] indices,
                                                     int indexNumber) {
        return getValueFromList(values, indices[indexNumber])
                .filter(value -> date.equals(value.getDate()))
                .map(value -> {
                    indices[indexNumber]++;
                    return value;
                });
    }

    private HasDayTypeIdAndTime getDepartmentDayType(ShiftPattern pattern,
                                                     SpecialCalendarDate specialDate) {
        switch (specialDate.getDateType()) {
            case HOLIDAY            : return pattern.getHolidayDepDayType();
            case EXTRA_WEEKEND      : return pattern.getExtraWeekendDepDayType();
            case EXTRA_WORK_DAY     : return pattern.getExtraWorkDayDepDayType();
            default                 : throw new RuntimeException();
        }
    }

    private <T> Optional<T> getValueFromList(List<T> list, int index) {
        if (index < list.size()) {
            return Optional.ofNullable(list.get(index));
        }
        return Optional.empty();
    }
}
