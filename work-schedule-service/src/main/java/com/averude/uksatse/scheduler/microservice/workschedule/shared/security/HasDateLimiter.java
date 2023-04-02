package com.averude.uksatse.scheduler.microservice.workschedule.shared.security;

import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasDate;
import com.averude.uksatse.scheduler.security.details.UserLevels;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

@Component
public class HasDateLimiter {

    public boolean check(Authentication authentication, List<? extends HasDate> list) {
        if (list == null) {
            return false;
        }

        var jwt = (Jwt) authentication.getPrincipal();
        var level = jwt.getClaimAsString("level");
        if (level.equals(UserLevels.SHIFT)) {
            var currentMonth = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
            return list.stream().noneMatch(hasDate -> hasDate.getDate().isBefore(currentMonth));
        }

        return true;
    }
}
