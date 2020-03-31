package com.averude.uksatse.scheduler.shared.extradays;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.shared.repository.ExtraWeekendRepository;
import com.averude.uksatse.scheduler.shared.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
public class ExtraDayGeneratorImpl implements ExtraDayGenerator {

    private final HolidayRepository holidayRepository;
    private final ExtraWeekendRepository extraWeekendRepository;

    @Autowired
    public ExtraDayGeneratorImpl(HolidayRepository holidayRepository,
                                 ExtraWeekendRepository extraWeekendRepository
    ) {
        this.holidayRepository = holidayRepository;
        this.extraWeekendRepository = extraWeekendRepository;
    }

    @Override
    public ExtraWeekend createExtraWeekend(Holiday holiday) {
        var nextWeekFirstDay = getNextWeekDayDate(holiday.getDate(), DayOfWeek.MONDAY);

        // Check if an extra weekend exists
        return extraWeekendRepository.findByDateAndDepartmentId(nextWeekFirstDay, holiday.getDepartmentId())
                // If an extra weekend is found then search for a linked holiday
                .map(weekend -> holidayRepository.findById(weekend.getHolidayId())
                        // If a holiday is found then move date of this weekend
                        // and create the new one
                        .map(existentHoliday -> {
                            var dayOfWeek = existentHoliday.getDate().getDayOfWeek();
                            if (dayOfWeek.compareTo(DayOfWeek.SUNDAY) == 0) {
                                // Should be changed because of opened session
                                weekend.setDate(weekend.getDate().plusDays(1L));
                                return createNewExtraWeekend(holiday, nextWeekFirstDay);
                            } else {
                                return createNewExtraWeekend(holiday,nextWeekFirstDay.plusDays(1L));
                            }
                        })
                        // ..or change this existent weekend's holiday id
                        .orElseGet(() -> {
                            weekend.setHolidayId(holiday.getId());
                            return weekend;
                        }))
                // ...if not then create a new one on monday
                .orElse(createNewExtraWeekend(holiday, nextWeekFirstDay));
    }

    @Override
    public ExtraWorkDay createExtraWorkDay(ExtraWeekend extraWeekend, LocalDate date) {
        var extraWorkDay = new ExtraWorkDay();
        extraWorkDay.setDepartmentId(extraWeekend.getDepartmentId());
        extraWorkDay.setExtraWeekendId(extraWeekend.getId());
        extraWorkDay.setDate(date);
        return extraWorkDay;
    }

    private ExtraWeekend createNewExtraWeekend(Holiday holiday, LocalDate date) {
        var extraWeekend = new ExtraWeekend();
        extraWeekend.setDepartmentId(holiday.getDepartmentId());
        extraWeekend.setHolidayId(holiday.getId());
        extraWeekend.setDate(date);
        return extraWeekend;
    }

    private LocalDate getNextWeekDayDate(LocalDate localDate, DayOfWeek dayOfWeek) {
        return localDate.plusWeeks(1L).with(dayOfWeek);
    }

}
