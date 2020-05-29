package com.averude.uksatse.scheduler.shared.creator;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.core.entity.Holiday;

import java.time.LocalDate;

public interface ExtraDayCreator {
    ExtraWeekend createExtraWeekend(Holiday holiday);

    ExtraWorkDay createExtraWorkDay(ExtraWeekend extraWeekend, LocalDate date);
}
