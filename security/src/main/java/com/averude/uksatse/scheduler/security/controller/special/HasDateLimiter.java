package com.averude.uksatse.scheduler.security.controller.special;

import com.averude.uksatse.scheduler.core.interfaces.entity.HasDate;
import com.averude.uksatse.scheduler.security.authority.Authorities;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.List;

import static com.averude.uksatse.scheduler.security.details.AccountUtils.getUserAccount;

@Component
public class HasDateLimiter {

    public boolean check(Authentication authentication, List<? extends HasDate> list) {
        if (list == null) {
            return false;
        }

        var user = getUserAccount(authentication);

        if (user.getAuthority().equals(Authorities.SHIFT_ADMIN)) {
            var currentMonth = LocalDate.now().with(TemporalAdjusters.firstDayOfMonth());
            return list.stream().noneMatch(hasDate -> hasDate.getDate().isBefore(currentMonth));
        }

        return true;
    }
}
