package com.averude.uksatse.scheduler.core.util;

import com.averude.uksatse.scheduler.core.entity.SpecialCalendarDate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SpecialCalendarDateUtil {

    public static Map<String, List<SpecialCalendarDate>> getSpecialDateMap(List<SpecialCalendarDate> specialCalendarDates) {
        var result = new HashMap<String, List<SpecialCalendarDate>>();
        specialCalendarDates.forEach(specialCalendarDate -> {
            var calendarDates = result.get(specialCalendarDate.getDateType());
            if (calendarDates == null) {
                var list = new ArrayList<SpecialCalendarDate>();
                list.add(specialCalendarDate);
                result.put(specialCalendarDate.getDateType(), list);
            } else {
                calendarDates.add(specialCalendarDate);
            }
        });
        return result;
    }
}
