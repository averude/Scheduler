package com.averude.uksatse.scheduler.generator.timenorm;

import com.averude.uksatse.scheduler.core.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.entity.WorkingTime;
import com.averude.uksatse.scheduler.core.entity.structure.Shift;
import com.averude.uksatse.scheduler.core.util.OffsetCalculator;
import com.averude.uksatse.scheduler.core.util.TimeCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.*;

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
                                                          List<SpecialCalendarDate> specialCalendarDates) {
        var shiftPattern    = shift.getShiftPattern();
        var units           = shiftPattern.getSequence();

        var dayTypeIndexes = new int[]{0};
        return from.datesUntil(to, Period.ofMonths(1))
                .map(month -> {
                    var extraCoefficient = getExtraCoefficient(specialCalendarDates, shiftPattern, dayTypeIndexes, month);

                    var offsetForDate = (int) offsetCalculator
                            .recalculateForDate(from, month, units.size(), offset);

                    float hours = getHours(units, month, offsetForDate) - extraCoefficient;
                    hours = hours >= 0 ? hours : 0;

                    return createWorkingTime(shift.getId(),
                            shift.getDepartmentId(),
                            hours,
                            month);
                })
                .collect(Collectors.toList());
    }

    private long getExtraCoefficient(List<SpecialCalendarDate> specialCalendarDates,
                                     ShiftPattern shiftPattern,
                                     int[] index,
                                     LocalDate month) {
        if (specialCalendarDates == null || specialCalendarDates.isEmpty() || index[0] >= specialCalendarDates.size()) {
            return 0L;
        }

        var specialCalendarDate = specialCalendarDates.get(index[0]);
        if (specialCalendarDate != null && compareMonthAndYear(specialCalendarDate.getDate(), month)) {
            index[0]++;
            return getDayTypeLengthBySpecialDate(shiftPattern, specialCalendarDate);
        }

        return 0L;
    }

    private long getDayTypeLengthBySpecialDate(ShiftPattern shiftPattern,
                                               SpecialCalendarDate specialCalendarDate) {
        switch (specialCalendarDate.getDateType()) {
            case HOLIDAY :        return timeCalculator
                    .getLength(shiftPattern.getHolidayDepDayType(), null);
            case EXTRA_WEEKEND :  return timeCalculator
                    .getLength(shiftPattern.getExtraWeekendDepDayType(), null);
            case EXTRA_WORK_DAY : return timeCalculator
                    .getLength(shiftPattern.getExtraWorkDayDepDayType(), null);
            default : throw new RuntimeException();
        }
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
