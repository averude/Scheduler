package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.shared.creator.ExtraDayCreator;
import com.averude.uksatse.scheduler.shared.repository.DepartmentRepository;
import com.averude.uksatse.scheduler.shared.repository.ExtraWeekendRepository;
import com.averude.uksatse.scheduler.shared.repository.HolidayRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import com.averude.uksatse.scheduler.shared.service.base.AByEnterpriseIdAndDateService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
@Slf4j
public class HolidayServiceImpl
        extends AByEnterpriseIdAndDateService<Holiday, Long> implements HolidayService {

    private final HolidayRepository         holidayRepository;
    private final ExtraWeekendRepository    extraWeekendRepository;
    private final ExtraDayCreator           extraDayCreator;

    @Autowired
    public HolidayServiceImpl(HolidayRepository holidayRepository,
                              ExtraWeekendRepository extraWeekendRepository,
                              DepartmentRepository departmentRepository,
                              ShiftRepository shiftRepository,
                              ExtraDayCreator extraDayCreator) {
        super(holidayRepository, departmentRepository, shiftRepository);
        this.holidayRepository = holidayRepository;
        this.extraWeekendRepository = extraWeekendRepository;
        this.extraDayCreator = extraDayCreator;
    }

    @Override
    @Transactional
    public Holiday save(Holiday holiday) {
        holiday = super.save(holiday);
        log.debug("Holiday {} is created", holiday);
        log.debug("Checking whether specialDateType is on weekend...");

        LocalDate holidayDate = holiday.getDate();

        if (isWeekend(holidayDate)) {
            log.debug("Holiday is on weekend.");
            var extraWeekend = extraDayCreator.createExtraWeekend(holiday);
            log.debug("Extra weekend {} for specialDateType {} is created", extraWeekend, holiday);
            extraWeekendRepository.save(extraWeekend);
            log.debug("Extra weekend for specialDateType created.");
        }

        return holiday;
    }

    @Override
    @Transactional
    public void delete(Holiday holiday) {
        log.debug("Removing specialDateType {} from database...", holiday);
        var holidayDate = holiday.getDate();

        if (holidayDate.getDayOfWeek().compareTo(DayOfWeek.SATURDAY) == 0) {
            holidayRepository.findByDate(holidayDate.plusDays(1L))
                    .ifPresent(sundayHoliday -> {
                        extraWeekendRepository.findByHolidayId(sundayHoliday.getId())
                                .ifPresent(sundayHolidayExtraWeekend -> {
                                    // Deleting specialDateType and its extra weekend
                                    // to free date for the next specialDateType's extra weekend
                                    super.delete(holiday);
                                    sundayHolidayExtraWeekend
                                            .setDate(sundayHolidayExtraWeekend.getDate().minusDays(1L));
                                });
                    });
        }

        super.delete(holiday);
        log.debug("Holiday {} is deleted.", holiday);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        this.findById(id).ifPresent(this::delete);
    }

    private boolean isWeekend(LocalDate localDate) {
        return localDate.getDayOfWeek().compareTo(DayOfWeek.SATURDAY) >= 0;
    }
}
