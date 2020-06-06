package com.averude.uksatse.scheduler.shared.creator;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.entity.ExtraWorkDay;
import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.shared.repository.ExtraWeekendRepository;
import com.averude.uksatse.scheduler.shared.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
public class ExtraDayCreatorImpl implements ExtraDayCreator {

    private final HolidayRepository         holidayRepository;
    private final ExtraWeekendRepository    extraWeekendRepository;

    @Autowired
    public ExtraDayCreatorImpl(HolidayRepository holidayRepository,
                               ExtraWeekendRepository extraWeekendRepository
    ) {
        this.holidayRepository = holidayRepository;
        this.extraWeekendRepository = extraWeekendRepository;
    }

    @Override
    @Transactional(propagation = Propagation.MANDATORY)
    public ExtraWeekend createExtraWeekend(Holiday holiday) {
        var nextWeekFirstDay = getNextWeekDayDate(holiday.getDate(), DayOfWeek.MONDAY);

        // Check if an extra weekend exists
        return extraWeekendRepository.findByDateAndEnterpriseId(nextWeekFirstDay, holiday.getEnterpriseId())
                // If an extra weekend is found then search for a linked holiday
                .map(weekend -> holidayRepository.findById(weekend.getHolidayId())
                        // If a holiday is found then move date of this weekend
                        // and create the new one
                        .map(existentHoliday -> {
                            var dayOfWeek = existentHoliday.getDate().getDayOfWeek();
                            if (dayOfWeek.compareTo(DayOfWeek.SUNDAY) == 0) {
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
        extraWorkDay.setEnterpriseId(extraWeekend.getEnterpriseId());
        extraWorkDay.setExtraWeekendId(extraWeekend.getId());
        extraWorkDay.setDate(date);
        return extraWorkDay;
    }

    private ExtraWeekend createNewExtraWeekend(Holiday holiday, LocalDate date) {
        var extraWeekend = new ExtraWeekend();
        extraWeekend.setEnterpriseId(holiday.getEnterpriseId());
        extraWeekend.setHolidayId(holiday.getId());
        extraWeekend.setDate(date);
        return extraWeekend;
    }

    private LocalDate getNextWeekDayDate(LocalDate localDate, DayOfWeek dayOfWeek) {
        return localDate.plusWeeks(1L).with(dayOfWeek);
    }

}
