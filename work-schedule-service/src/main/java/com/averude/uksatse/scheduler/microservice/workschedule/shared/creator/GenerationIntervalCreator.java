package com.averude.uksatse.scheduler.microservice.workschedule.shared.creator;

import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasDateDuration;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interval.GenerationInterval;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Consumer;
import java.util.stream.Collectors;

@Slf4j
@Component
public class GenerationIntervalCreator<T> {

    public GenerationInterval<T> createSubstitutionInterval(LocalDate from,
                                                            LocalDate to,
                                                            HasDateDuration composition,
                                                            Consumer<GenerationInterval<T>> afterIntervalCreated) {
        Objects.requireNonNull(composition);

        var intervalStart   = from.isAfter(composition.getFrom()) ? from : composition.getFrom();
        var intervalEnd     = to.isBefore(composition.getTo()) ? to : composition.getTo();

        var interval = new GenerationInterval<T>(intervalStart, intervalEnd);
        if (afterIntervalCreated != null) afterIntervalCreated.accept(interval);

        return interval;
    }

    public List<GenerationInterval<T>> createSubstitutionIntervals(LocalDate from,
                                                                   LocalDate to,
                                                                   List<? extends HasDateDuration> compositions,
                                                                   Consumer<GenerationInterval<T>> afterIntervalCreated) {
        return compositions.stream()
                .map(composition -> createSubstitutionInterval(from, to, composition, afterIntervalCreated))
                .collect(Collectors.toList());
    }

    public List<GenerationInterval<T>> createMainIntervals(HasDateDuration mainComposition,
                                                           List<? extends HasDateDuration> substitutionCompositions) {
        return createMainIntervals(mainComposition.getFrom(), mainComposition.getTo(), mainComposition, substitutionCompositions, null);
    }

    public List<GenerationInterval<T>> createMainIntervals(LocalDate from,
                                                           LocalDate to,
                                                           HasDateDuration mainComposition,
                                                           List<? extends HasDateDuration> substitutionCompositions,
                                                           Consumer<GenerationInterval<T>> afterIntervalCreated) {
        var result = new ArrayList<GenerationInterval<T>>();

        var intervalStart   = from.isBefore(mainComposition.getFrom()) ? mainComposition.getFrom() : from;
        var intervalEnd     = to.isAfter(mainComposition.getTo()) ? mainComposition.getTo() : to;

        for (int i = 0; i <= substitutionCompositions.size(); i++) {
            var interval = new GenerationInterval<T>();

            if (i >= substitutionCompositions.size()) {
                if (!intervalStart.isAfter(intervalEnd)) {
                    interval.setFrom(intervalStart);
                    interval.setTo(intervalEnd);
                    if (afterIntervalCreated != null) afterIntervalCreated.accept(interval);
                    result.add(interval);
                }
                break;
            }

            var composition = substitutionCompositions.get(i);

            // Instead of using 'isAfter || isEqual'
            if (!intervalStart.isBefore(composition.getFrom())) {
                // Instead of using 'isBefore || isEqual'
                if (!composition.getTo().isAfter(intervalEnd)) {
                    // Instead of using 'isAfter || isEqual'
                    if (!composition.getTo().isBefore(intervalStart)) {
                        intervalStart = composition.getTo().plusDays(1);
                    }
                    continue;
                } else {
                    break;
                }
            }

            if (intervalEnd.isAfter(composition.getFrom())) {
                interval.setFrom(intervalStart);
                interval.setTo(composition.getFrom().minusDays(1));
                if (afterIntervalCreated != null) afterIntervalCreated.accept(interval);
                result.add(interval);

                intervalStart = composition.getTo().plusDays(1);
            } else {
                interval.setFrom(intervalStart);
                interval.setTo(intervalEnd);
                if (afterIntervalCreated != null) afterIntervalCreated.accept(interval);
                result.add(interval);
                break;
            }

        }

        return result;
    }
}
