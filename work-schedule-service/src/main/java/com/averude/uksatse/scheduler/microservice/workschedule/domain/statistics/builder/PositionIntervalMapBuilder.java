package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.builder;

import com.averude.uksatse.scheduler.core.creator.GenerationIntervalCreator;
import com.averude.uksatse.scheduler.core.interfaces.entity.Composition;
import com.averude.uksatse.scheduler.core.interfaces.entity.HasDateDuration;
import com.averude.uksatse.scheduler.core.model.interval.GenerationInterval;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static com.averude.uksatse.scheduler.core.util.IntervalUtils.intersection;

@RequiredArgsConstructor
@Component
public class PositionIntervalMapBuilder {

    private final GenerationIntervalCreator<Long> intervalCreator;

    public Map<Long, List<GenerationInterval<Long>>> getPositionIntervalsMap(LocalDate from,
                                                                             LocalDate to,
                                                                             List<? extends Composition> mainCompositions,
                                                                             List<? extends Composition> substitutionCompositions) {
        var map = new HashMap<Long, List<GenerationInterval<Long>>>();
        var substitutions = new LinkedList<>(substitutionCompositions);
        var otherPositionSubstitutionCompositions = new LinkedList<Composition>();

        for (var composition : mainCompositions) {
            otherPositionSubstitutionCompositions.clear();

            var iterator = substitutions.iterator();

            while (iterator.hasNext()) {
                var substitutionComposition = iterator.next();

                /*
                If substitution composition date range
                is after main composition's range
                then skip this main composition
                */
                if (substitutionComposition.getFrom().isAfter(composition.getTo())) {
                    break;
                }

                /*
                If substitution composition position id isn't equal to
                and date range doesn't intersect with main composition's
                then add this substitution composition to other list
                 */
                if (!substitutionComposition.getPositionId().equals(composition.getPositionId())
                        && intersection(substitutionComposition, composition)) {
                    otherPositionSubstitutionCompositions.add(substitutionComposition);
                    continue;
                }

                /*
                If substitution composition position id is equal to
                and date range intersects with main composition's
                than remove this substitution composition from its list
                 */
                if (substitutionComposition.getPositionId().equals(composition.getPositionId())
                        && intersection(substitutionComposition, composition)) {
                    iterator.remove();
                }
            }

            otherPositionSubstitutionCompositions.sort(Comparator.comparing(HasDateDuration::getFrom));
            var positionIntervals = intervalCreator.createMainIntervals(from, to, composition,
                    otherPositionSubstitutionCompositions, (interval) -> interval.setObject(composition.getPositionId()));

            addValueToMap(map, composition.getPositionId(), positionIntervals);
        }

        for (var composition : substitutions) {
            if (composition.getFrom().isAfter(to)) {
                break;
            }

            var positionIntervals = intervalCreator.createSubstitutionInterval(from, to, composition,
                    (interval) -> interval.setObject(composition.getPositionId()));
            addValueToMap(map, composition.getPositionId(), Collections.singletonList(positionIntervals));
        }

        map.forEach((aLong, generationIntervals) -> generationIntervals.sort((a, b) -> (int) b.getFrom().until(a.getFrom(), ChronoUnit.DAYS)));

        return map;
    }

    private <K, V> void addValueToMap(HashMap<K, List<V>> map,
                                      K key,
                                      List<V> valueList) {
        var values = map.get(key);
        if (values == null) {
            var list = new ArrayList<>(valueList);
            map.put(key, list);
        } else {
            values.addAll(valueList);
        }
    }
}
