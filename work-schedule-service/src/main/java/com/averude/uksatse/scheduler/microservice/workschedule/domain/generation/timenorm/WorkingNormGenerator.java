package com.averude.uksatse.scheduler.microservice.workschedule.domain.generation.timenorm;

import com.averude.uksatse.scheduler.core.model.entity.PatternUnit;
import com.averude.uksatse.scheduler.core.model.entity.ShiftPattern;
import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.core.model.entity.WorkingNorm;
import com.averude.uksatse.scheduler.core.model.entity.structure.Shift;
import com.averude.uksatse.scheduler.core.util.OffsetCalculator;
import com.averude.uksatse.scheduler.core.util.TimeCalculator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class WorkingNormGenerator {

    private final TimeCalculator    timeCalculator;
    private final OffsetCalculator  offsetCalculator;

    @Autowired
    public WorkingNormGenerator(TimeCalculator timeCalculator,
                                OffsetCalculator offsetCalculator) {
        this.timeCalculator = timeCalculator;
        this.offsetCalculator = offsetCalculator;
    }

    public List<WorkingNorm> calculateWorkingNormForShift(int offset,
                                                          Shift shift,
                                                          ShiftPattern shiftPattern,
                                                          LocalDate from,
                                                          LocalDate to,
                                                          List<SpecialCalendarDate> specialCalendarDates) {
        var units           = shiftPattern.getSequence();

        var dayTypeIndexes = new int[]{0};
        return from.datesUntil(to, Period.ofMonths(1))
                .map(month -> {
                    var extraCoefficient = getExtraCoefficient(specialCalendarDates, shiftPattern, dayTypeIndexes, month);

                    var offsetForDate = (int) offsetCalculator
                            .recalculateForDate(from, month, units.size(), offset);

                    long days = getDays(units, month, offsetForDate);
                    float hours = getHours(units, month, offsetForDate) - extraCoefficient;
                    hours = hours >= 0 ? hours : 0;

                    return createWorkingNorm(shift.getId(),
                            shift.getDepartmentId(),
                            hours, days, month);
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

        // Will implement later

        return 0L;
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

    private long getDays(List<PatternUnit> units,
                         LocalDate date,
                         int offsetForDate) {
        return timeCalculator.calculateDays(offsetForDate, units, date);
    }

    private WorkingNorm createWorkingNorm(Long shiftId,
                                          Long departmentId,
                                          Float hours,
                                          Long days,
                                          LocalDate date) {
        var workingNorm = new WorkingNorm();
        workingNorm.setShiftId(shiftId);
        workingNorm.setDepartmentId(departmentId);
        workingNorm.setHours(hours);
        workingNorm.setDate(date);
        workingNorm.setDays(days);
        return workingNorm;
    }
}
