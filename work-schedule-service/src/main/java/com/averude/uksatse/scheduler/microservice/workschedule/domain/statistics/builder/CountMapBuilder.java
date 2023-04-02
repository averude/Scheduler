package com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.builder;

import com.averude.uksatse.scheduler.microservice.workschedule.domain.specialcalendardate.entity.SpecialCalendarDate;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.statistics.wrapper.WorkDayWrapper;
import com.averude.uksatse.scheduler.microservice.workschedule.domain.workschedule.entity.WorkDay;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasDate;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interfaces.HasDateDuration;
import com.averude.uksatse.scheduler.microservice.workschedule.shared.model.interval.GenerationInterval;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Consumer;

import static com.averude.uksatse.scheduler.microservice.workschedule.shared.utils.IntervalUtils.isBetween;

@Component
public class CountMapBuilder {

    public Map<WorkDayWrapper, Integer> build(List<WorkDay> workDays,
                                              List<SpecialCalendarDate> specialCalendarDates) {
        Map<WorkDayWrapper, Integer> workDayCountMap = new HashMap<>();

        if (specialCalendarDates != null && !specialCalendarDates.isEmpty()) {

            for (int workDayIndex = 0, specialDateIndex = 0; workDayIndex < workDays.size(); workDayIndex++) {

                var workDay = workDays.get(workDayIndex);
                var wrapper = new WorkDayWrapper(workDay, null);

                specialDateIndex = setWrapperSpecialDateType(specialCalendarDates, wrapper, specialDateIndex);

                workDayCountMap.merge(wrapper, 1, Integer::sum);
            }

        } else {
            workDays.forEach(workDay -> workDayCountMap.merge(new WorkDayWrapper(workDay, null), 1, Integer::sum));
        }
        return workDayCountMap;
    }

    public Map<WorkDayWrapper, Integer> build(List<WorkDay> workDays,
                                              List<GenerationInterval<Long>> intervals,
                                              List<SpecialCalendarDate> specialCalendarDates) {
        var map = new HashMap<WorkDayWrapper, Integer>();

        if (specialCalendarDates == null || specialCalendarDates.isEmpty()) {
            forEachFilteredBySortedIntervals(workDays, intervals,
                    (workDay) -> map.merge(new WorkDayWrapper(workDay, null), 1, Integer::sum));
        } else {
            for (int workDayIndex = 0, intervalIndex = 0, specialDateIndex = 0;
                 workDayIndex < workDays.size() && intervalIndex < intervals.size();) {

                var workDay     = workDays.get(workDayIndex);
                var interval    = intervals.get(intervalIndex);
                var workDayDate = workDay.getDate();

                if (interval.getTo().isBefore(workDayDate)) {
                    intervalIndex++;
                } else {
                    if (isBetween(workDayDate, interval)) {
                        var wrapper = new WorkDayWrapper(workDay, null);

                        specialDateIndex = setWrapperSpecialDateType(specialCalendarDates, wrapper, specialDateIndex);

                        map.merge(wrapper, 1, Integer::sum);
                    }
                    workDayIndex++;
                }
            }
        }

        return map;
    }

    private int setWrapperSpecialDateType(List<SpecialCalendarDate> specialCalendarDates,
                                          WorkDayWrapper wrapper,
                                          int specialDateIndex) {
        if (specialDateIndex >= specialCalendarDates.size()) {
            return specialDateIndex;
        }

        var workDayDate = wrapper.getWorkDay().getDate();
        var specialCalendarDate = specialCalendarDates.get(specialDateIndex);

        if (specialCalendarDate.getDate().isEqual(workDayDate)) {
            wrapper.setSpecialDateType(specialCalendarDate.getDateType());
            specialDateIndex++;
        } else if (specialCalendarDates.get(specialDateIndex).getDate().isBefore(workDayDate)) {
            while (specialDateIndex < specialCalendarDates.size()
                    && specialCalendarDates.get(specialDateIndex).getDate().isBefore(workDayDate)) {
                specialDateIndex++;
            }

            if (specialDateIndex < specialCalendarDates.size()
                    && specialCalendarDates.get(specialDateIndex).getDate().isEqual(workDayDate)) {
                wrapper.setSpecialDateType(specialCalendarDates.get(specialDateIndex).getDateType());
                specialDateIndex++;
            }
        }
        return specialDateIndex;
    }

    private <T extends HasDate> void forEachFilteredBySortedIntervals(List<T> list,
                                                                      List<? extends HasDateDuration> intervals,
                                                                      Consumer<T> consumer) {
        for (int hasDateIndex = 0, intervalIndex = 0; hasDateIndex < list.size() && intervalIndex < intervals.size();) {

            var hasDate     = list.get(hasDateIndex);
            var interval    = intervals.get(intervalIndex);
            var date        = hasDate.getDate();

            if (interval.getTo().isBefore(date)) {
                intervalIndex++;
            } else {
                if (isBetween(date, interval)) {
                    consumer.accept(hasDate);
                }
                hasDateIndex++;
            }

        }
    }
}
