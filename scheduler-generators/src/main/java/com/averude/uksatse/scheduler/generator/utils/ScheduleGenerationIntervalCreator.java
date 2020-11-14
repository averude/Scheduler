package com.averude.uksatse.scheduler.generator.utils;

import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.ShiftComposition;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasDateDuration;
import com.averude.uksatse.scheduler.core.util.OffsetCalculator;
import com.averude.uksatse.scheduler.generator.model.ScheduleGenerationInterval;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class ScheduleGenerationIntervalCreator {

    private final OffsetCalculator offsetCalculator;

    @Autowired
    public ScheduleGenerationIntervalCreator(OffsetCalculator offsetCalculator) {
        this.offsetCalculator = offsetCalculator;
    }

    public List<ScheduleGenerationInterval> getIntervalsForComposition(ShiftComposition composition,
                                                                       List<ShiftComposition> employeeCompositions,
                                                                       LocalDate from,
                                                                       LocalDate to,
                                                                       int offset,
                                                                       int unitsSize) {
        var result = new ArrayList<ScheduleGenerationInterval>();
        log.debug("Creating intervals from={} to={} for composition {}.", from, to, composition);

        if (composition.getSubstitution()) {
            result.add(getIntervalForSubstitutionShift(from, to, composition, unitsSize, offset));
        } else {
            result.addAll(getIntervalsForMainShift(from, to, employeeCompositions, composition.getEmployee(), unitsSize, offset));
        }

        return result;
    }

    private ScheduleGenerationInterval getIntervalForSubstitutionShift(LocalDate from,
                                                                       LocalDate to,
                                                                       ShiftComposition composition,
                                                                       int unitsSize,
                                                                       int offset) {
        log.debug("Creating interval for substitution shift");
        var interval        = new ScheduleGenerationInterval();
        var intervalStart   = from.isAfter(composition.getFrom()) ? from : composition.getFrom();
        var intervalEnd     = to.isBefore(composition.getTo()) ? to : composition.getTo();
        var intervalOffset  = offsetCalculator.recalculateForDate(from, intervalStart, unitsSize, offset);

        interval.setFrom(intervalStart);
        interval.setTo(intervalEnd);
        interval.setEmployee(composition.getEmployee());
        interval.setOffset(intervalOffset);
        log.debug("Interval {} is created", interval);
        return interval;
    }

    private List<ScheduleGenerationInterval> getIntervalsForMainShift(LocalDate from,
                                                                      LocalDate to,
                                                                      List<? extends HasDateDuration> compositions,
                                                                      Employee employee,
                                                                      int unitsSize,
                                                                      int offset) {
        log.debug("Creating interval for main shift");
        log.debug("Substitution compositions: {}", compositions);
        var result = new ArrayList<ScheduleGenerationInterval>();

        LocalDate intervalStart = from;

        for (int i = 0; i <= compositions.size(); i++) {
            var interval = new ScheduleGenerationInterval();

            if (i >= compositions.size()) {
                setValuesToInterval(interval, from, intervalStart, to, employee, unitsSize, offset);
                result.add(interval);
                break;
            }

            var composition = compositions.get(i);

            if (intervalStart.isAfter(composition.getFrom())) {
                if (composition.getTo().isBefore(to)) {
                    intervalStart = composition.getTo().plusDays(1); //should be tested
                    continue;
                } else {
                    break;
                }
            }

            if (to.isAfter(composition.getFrom())) {
                setValuesToInterval(interval, from, intervalStart, composition.getFrom().minusDays(1), employee, unitsSize, offset);
                result.add(interval);

                intervalStart = composition.getTo().plusDays(1);
            } else {
                setValuesToInterval(interval, from, intervalStart, to, employee, unitsSize, offset);
                result.add(interval);
                break;
            }

        }
        log.debug("Intervals {} is created.", result);
        return result;
    }

    private void setValuesToInterval(ScheduleGenerationInterval interval,
                                     LocalDate from,
                                     LocalDate intervalStart,
                                     LocalDate to,
                                     Employee employee,
                                     int unitsSize,
                                     int offset) {
        interval.setFrom(intervalStart);
        interval.setTo(to);
        interval.setEmployee(employee);
        interval.setOffset(offsetCalculator.recalculateForDate(from, intervalStart, unitsSize, offset));
    }

}
