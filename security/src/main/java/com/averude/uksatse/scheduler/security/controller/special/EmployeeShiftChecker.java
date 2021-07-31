package com.averude.uksatse.scheduler.security.controller.special;

import com.averude.uksatse.scheduler.core.interfaces.entity.Composition;
import com.averude.uksatse.scheduler.core.model.entity.MainComposition;
import com.averude.uksatse.scheduler.core.model.entity.WorkDay;
import com.averude.uksatse.scheduler.security.details.UserLevels;
import com.averude.uksatse.scheduler.shared.repository.MainCompositionRepository;
import com.averude.uksatse.scheduler.shared.repository.SubstitutionCompositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;
import java.util.function.Predicate;

import static com.averude.uksatse.scheduler.core.util.IntervalUtils.isBetween;
import static com.averude.uksatse.scheduler.security.utils.SecurityUtils.getLongListClaim;
import static java.util.stream.Collectors.toList;

@Component
@RequiredArgsConstructor
public class EmployeeShiftChecker {

    private final MainCompositionRepository mainCompositionRepository;
    private final SubstitutionCompositionRepository substitutionCompositionRepository;

    public boolean belongs(Authentication authentication, List<WorkDay> workDays) {
        if (workDays == null || workDays.isEmpty()) {
            return false;
        }

        var jwt = (Jwt) authentication.getPrincipal();
        var level = jwt.getClaimAsString("level");

        if (level.equals(UserLevels.SHIFT)) {
            var shiftIds = getLongListClaim(jwt, "shiftIds");

            var date = workDays.get(0).getDate();
            var from = date.with(TemporalAdjusters.firstDayOfMonth());
            var to = date.with(TemporalAdjusters.lastDayOfMonth());

            var mainCompositions = mainCompositionRepository.getAllByShiftIdsAndDateBetweenOrdered(shiftIds, from, to);

            var mainCompositionIds = mainCompositions.stream().map(MainComposition::getId).collect(toList());

            var mainSubCompositions = substitutionCompositionRepository.getAllByShiftIdsNotInAndMainShiftCompositionInAndDateBetweenOrdered(shiftIds, mainCompositionIds, from, to);
            var subsCompositions = substitutionCompositionRepository.getAllBySubShiftIdsAndDateOrdered(shiftIds, from, to);

            return workDays.stream().allMatch(workDay -> {

                var employeeId = workDay.getEmployeeId();
                var workDayDate = workDay.getDate();

                Predicate<Composition> predicate = composition -> composition.getEmployeeId().equals(employeeId) &&
                        isBetween(workDayDate, composition);

                return subsCompositions.stream().anyMatch(predicate)
                        || checkMainComposition(employeeId, workDayDate, mainCompositions, mainSubCompositions);
            });
        }

        return true;
    }

    private boolean checkMainComposition(Long employeeId,
                                         LocalDate workDayDate,
                                         List<? extends Composition> mainCompositions,
                                         List<? extends Composition> subCompositions) {

        for (var composition : mainCompositions) {

            if (composition.getEmployeeId().equals(employeeId)
                    && isBetween(workDayDate, composition)) {
                return subCompositions.stream()
                        .noneMatch(subComposition -> subComposition.getEmployeeId().equals(employeeId)
                                && isBetween(workDayDate, subComposition));
            }

        }

        return false;

    }

}
