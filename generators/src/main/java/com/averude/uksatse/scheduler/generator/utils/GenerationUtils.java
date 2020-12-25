package com.averude.uksatse.scheduler.generator.utils;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasDayTypeAndTime;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;

public class GenerationUtils {

    public static void updateWorkDay(WorkDay workDay,
                                     HasDayTypeAndTime unit) {
        workDay.setScheduledDayTypeId(unit.getDayType().getId());
        workDay.setStartTime(unit.getStartTime());
        workDay.setEndTime(unit.getEndTime());
        workDay.setBreakStartTime(unit.getBreakStartTime());
        workDay.setBreakEndTime(unit.getBreakEndTime());
    }

    public static WorkDay createWorkDay(Employee employee,
                                        HasDayTypeAndTime unit,
                                        LocalDate date) {
        var workDay = new WorkDay();
        workDay.setDepartmentId(employee.getDepartmentId());
        workDay.setEmployeeId(employee.getId());
        workDay.setDate(date);
        updateWorkDay(workDay, unit);
        return workDay;
    }

    public static <T> Optional<T> getValueFromList(List<T> list, int index) {
        if (index < list.size()) {
            return Optional.ofNullable(list.get(index));
        }
        return Optional.empty();
    }

    public static WorkDay getWorkDay(LocalDate startDate,
                                     SpecialCalendarDate specialCalendarDate,
                                     WorkDay[] workDays) {
        var date = specialCalendarDate.getDate();
        var index = (int) startDate.until(date, ChronoUnit.DAYS);

        if (index >= workDays.length) {
            return null;
        }

        return workDays[index];
    }

    public static WorkDay getWorkDay(LocalDate startDate,
                                     SpecialCalendarDate specialCalendarDate,
                                     List<WorkDay> workDays) {
        var date = specialCalendarDate.getDate();
        var index = (int) startDate.until(date, ChronoUnit.DAYS);

        if (index >= workDays.size()) {
            return null;
        }

        return workDays.get(index);
    }
}
