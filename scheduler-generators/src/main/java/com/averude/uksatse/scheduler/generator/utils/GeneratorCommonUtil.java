package com.averude.uksatse.scheduler.generator.utils;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

public class GeneratorCommonUtil {
    public static List<LocalDate> getDatesBetween(LocalDate from, LocalDate to) {
        return from.datesUntil(to.plusDays(1)).collect(Collectors.toList());
    }
}
