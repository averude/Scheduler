package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDate;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static com.averude.uksatse.scheduler.core.model.entity.SpecialCalendarDateType.*;
import static com.averude.uksatse.scheduler.core.util.SpecialCalendarDateUtil.getSpecialDateMap;

public class SpecialCalendarDateGenerator {

    private final Random random = new Random(42);

    public SpecialCalendarDate generate(LocalDate date, String type){
        var specialCalendarDate = new SpecialCalendarDate();
        specialCalendarDate.setDate(date);
        specialCalendarDate.setDateType(type);
        return specialCalendarDate;
    }

    public SpecialCalendarDate generate(String date, String type){
        var specialCalendarDate = new SpecialCalendarDate();
        specialCalendarDate.setDate(LocalDate.parse(date));
        specialCalendarDate.setDateType(type);
        return specialCalendarDate;
    }

    public List<SpecialCalendarDate> generateList() {
        var holiday = generate("2020-01-02", HOLIDAY);
        return Arrays.asList(holiday);
    }

    public List<SpecialCalendarDate> generateRandomSortedList(LocalDate start,
                                                              LocalDate end,
                                                              int maxNumberOfDates) {
        var types = new String[]{HOLIDAY, EXTRA_WORK_DAY, EXTRA_WEEKEND};
        long daysBetween = start.until(end, ChronoUnit.DAYS);
        if (daysBetween < maxNumberOfDates) {
            throw new IllegalArgumentException();
        }

        int interval = (int) daysBetween/maxNumberOfDates;

        var result = new ArrayList<SpecialCalendarDate>();

        LocalDate begin = start;
        for (int i = 0; i < maxNumberOfDates; i++) {
            LocalDate date = begin.plusDays(random.nextInt(interval));

            if (date.isAfter(end)) {
                break;
            }

            var specialCalendarDate = generate(date, types[random.nextInt(types.length)]);
            result.add(specialCalendarDate);
            begin = begin.plusDays(interval + 1);
        }

        return result;
    }

    public Map<String, List<SpecialCalendarDate>> generateRandomMap(LocalDate start,
                                                                    LocalDate end,
                                                                    int maxNumberOfDates) {
        return getSpecialDateMap(generateRandomSortedList(start, end, maxNumberOfDates));
    }
}
