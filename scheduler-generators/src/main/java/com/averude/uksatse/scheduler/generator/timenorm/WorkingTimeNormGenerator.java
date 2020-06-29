package com.averude.uksatse.scheduler.generator.timenorm;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.core.entity.interfaces.HasDate;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.core.util.OffsetCalculator;
import com.averude.uksatse.scheduler.core.util.TimeCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class WorkingTimeNormGenerator {

    private final TimeCalculator    timeCalculator;
    private final OffsetCalculator  offsetCalculator;

    @Autowired
    public WorkingTimeNormGenerator(TimeCalculator timeCalculator,
                                    OffsetCalculator offsetCalculator) {
        this.timeCalculator = timeCalculator;
        this.offsetCalculator = offsetCalculator;
    }

    public List<WorkingTime> calculateWorkingTimeForShift(int offset,
                                                          Shift shift,
                                                          LocalDate from,
                                                          LocalDate to,
                                                          List<Holiday> holidays,
                                                          List<ExtraWeekend> extraWeekends,
                                                          List<ExtraWorkDay> extraWorkDays) {
        var shiftPattern    = shift.getShiftPattern();
        var units           = shiftPattern.getSequence();

        var dayTypeIndexes = new int[]{0, 0, 0};

        var result = new ArrayList<WorkingTime>();

        var yearMonths = from.datesUntil(to, Period.ofMonths(1)).collect(Collectors.toList());
        for (var month : yearMonths) {
            var extraCoefficient = getExtraCoefficient(holidays, extraWeekends, extraWorkDays,
                    shiftPattern, dayTypeIndexes, month);

            var offsetForDate = (int) offsetCalculator
                    .recalculateForDate(from, month, units.size(), offset);

            float hours = getHours(units, month, offsetForDate) - extraCoefficient;
            hours = hours >= 0 ? hours : 0;

            var workingTime = createWorkingTime(shift.getId(),
                    shift.getDepartmentId(),
                    hours,
                    month);
            result.add(workingTime);
        }

        return result;
    }

    private long getExtraCoefficient(List<Holiday> holidays,
                                     List<ExtraWeekend> extraWeekends,
                                     List<ExtraWorkDay> extraWorkDays,
                                     ShiftPattern shiftPattern,
                                     int[] dayTypeIndexes,
                                     LocalDate month) {
        var extraCoefficient = 0L;

        var holidayDepDayType       = shiftPattern.getHolidayDepDayType();
        var extraWeekendDepDayType  = shiftPattern.getExtraWeekendDepDayType();
        var extraWorkDayDepDayType  = shiftPattern.getExtraWorkDayDepDayType();

        extraCoefficient += calcExtraCoefficient(month, holidayDepDayType, holidays, dayTypeIndexes, 0);
        extraCoefficient += calcExtraCoefficient(month, extraWeekendDepDayType, extraWeekends, dayTypeIndexes, 1);
        extraCoefficient += calcExtraCoefficient(month, extraWorkDayDepDayType, extraWorkDays, dayTypeIndexes, 2);

        return extraCoefficient;
    }

    private long calcExtraCoefficient(LocalDate date,
                                      DepartmentDayType departmentDayType,
                                      List<? extends HasDate> hasDateList,
                                      int[] dayTypeIndexes,
                                      int idx) {
        var extraCoefficient = 0;

        if (departmentDayType != null && hasDateList != null && hasDateList.size() > 0) {
            var holiday = hasDateList.get(dayTypeIndexes[idx]);
            if (compareMonthAndYear(date, holiday.getDate())) {
                extraCoefficient = timeCalculator.getLength(departmentDayType, null);
                dayTypeIndexes[idx]++;
            }
        }

        return extraCoefficient;
    }

    private boolean compareMonthAndYear(LocalDate date1,
                                        LocalDate date2) {
        return date1.getMonthValue() == date2.getMonthValue()
                && date1.getYear() == date2.getYear();
    }

    private float getHours(List<PatternUnit> units,
                           LocalDate date,
                           int offsetForDate) {
        return timeCalculator.calculateHours(offsetForDate, units, date);
    }

    private WorkingTime createWorkingTime(Long shiftId,
                                          Long departmentId,
                                          Float hours,
                                          LocalDate date) {
        var workingTime = new WorkingTime();
        workingTime.setShiftId(shiftId);
        workingTime.setDepartmentId(departmentId);
        workingTime.setHours(hours);
        workingTime.setDate(date);
        return workingTime;
    }
}
