package com.averude.uksatse.scheduler.testing;

import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static com.averude.uksatse.scheduler.core.entity.SpecialCalendarDateType.HOLIDAY;

public class SpecialCalendarDateGenerator {

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
}
