package com.averude.uksatse.scheduler.generator.interval;

import com.averude.uksatse.scheduler.core.interfaces.entity.EntityComposition;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasDateDuration;
import com.averude.uksatse.scheduler.core.util.OffsetCalculator;
import com.averude.uksatse.scheduler.generator.model.GenerationInterval;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.BooleanSupplier;

@Slf4j
@Component
@RequiredArgsConstructor
public class GenerationIntervalCreator<T> {

    private final OffsetCalculator offsetCalculator;

    public List<GenerationInterval<T>> getIntervalsForComposition(EntityComposition<?, T> composition,
                                                               List<? extends HasDateDuration> employeeCompositions,
                                                               BooleanSupplier compositionDivider,
                                                               LocalDate from,
                                                               LocalDate to,
                                                               int offset,
                                                               int unitsSize) {
        var result = new ArrayList<GenerationInterval<T>>();
        log.debug("Creating intervals from={} to={} for composition {}.", from, to, composition);

        if (compositionDivider.getAsBoolean()) {
            result.add(getIntervalForSubstitutionShift(from, to, composition, unitsSize, offset));
        } else {
            result.addAll(getIntervalsForMainShift(from, to, employeeCompositions, composition.getSideB(), unitsSize, offset));
        }

        return result;
    }

    private GenerationInterval<T> getIntervalForSubstitutionShift(LocalDate from,
                                                                  LocalDate to,
                                                                  EntityComposition<?, T> composition,
                                                                  int unitsSize,
                                                                  int offset) {
        log.debug("Creating interval for substitution shift");
        var interval        = new GenerationInterval<T>();
        var intervalStart   = from.isAfter(composition.getFrom()) ? from : composition.getFrom();
        var intervalEnd     = to.isBefore(composition.getTo()) ? to : composition.getTo();
        var intervalOffset  = offsetCalculator.recalculateForDate(from, intervalStart, unitsSize, offset);

        interval.setFrom(intervalStart);
        interval.setTo(intervalEnd);
        interval.setObject(composition.getSideB());
        interval.setOffset(intervalOffset);
        log.debug("Interval {} is created", interval);
        return interval;
    }

    private List<GenerationInterval<T>> getIntervalsForMainShift(LocalDate from,
                                                                 LocalDate to,
                                                                 List<? extends HasDateDuration> compositions,
                                                                 T object,
                                                                 int unitsSize,
                                                                 int offset) {
        log.debug("Creating interval for main shift");
        log.debug("Substitution compositions: {}", compositions);
        var result = new ArrayList<GenerationInterval<T>>();

        LocalDate intervalStart = from;

        for (int i = 0; i <= compositions.size(); i++) {
            var interval = new GenerationInterval<T>();

            if (i >= compositions.size()) {
                setValuesToInterval(interval, from, intervalStart, to, object, unitsSize, offset);
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
                setValuesToInterval(interval, from, intervalStart, composition.getFrom().minusDays(1), object, unitsSize, offset);
                result.add(interval);

                intervalStart = composition.getTo().plusDays(1);
            } else {
                setValuesToInterval(interval, from, intervalStart, to, object, unitsSize, offset);
                result.add(interval);
                break;
            }

        }
        log.debug("Intervals {} is created.", result);
        return result;
    }

    private void setValuesToInterval(GenerationInterval<T> interval,
                                     LocalDate from,
                                     LocalDate intervalStart,
                                     LocalDate to,
                                     T object,
                                     int unitsSize,
                                     int offset) {
        interval.setFrom(intervalStart);
        interval.setTo(to);
        interval.setObject(object);
        interval.setOffset(offsetCalculator.recalculateForDate(from, intervalStart, unitsSize, offset));
    }

}
