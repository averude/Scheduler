package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.shared.creator.ExtraDayCreator;
import com.averude.uksatse.scheduler.shared.repository.*;
import com.averude.uksatse.scheduler.shared.service.base.AByEnterpriseIdAndDateService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
public class HolidayServiceImpl
        extends AByEnterpriseIdAndDateService<Holiday, Long> implements HolidayService {

    private static Logger logger = LoggerFactory.getLogger(HolidayService.class);

    private final HolidayRepository         holidayRepository;
    private final ExtraWeekendRepository    extraWeekendRepository;
    private final ScheduleRepository        scheduleRepository;
    private final ExtraDayCreator extraDayCreator;

    @Autowired
    public HolidayServiceImpl(HolidayRepository holidayRepository,
                              ExtraWeekendRepository extraWeekendRepository,
                              ScheduleRepository scheduleRepository,
                              DepartmentRepository departmentRepository,
                              ShiftRepository shiftRepository,
                              ExtraDayCreator extraDayCreator) {
        super(holidayRepository, departmentRepository, shiftRepository);
        this.holidayRepository = holidayRepository;
        this.extraWeekendRepository = extraWeekendRepository;
        this.extraDayCreator = extraDayCreator;
        this.scheduleRepository = scheduleRepository;
    }

    @Override
    @Transactional
    public Holiday save(Holiday holiday) {
        holiday = super.save(holiday);
        logger.debug("Holiday {} is created", holiday);
        logger.debug("Checking whether holiday is on weekend...");

        LocalDate holidayDate = holiday.getDate();

        if (isWeekend(holidayDate)) {
            logger.debug("Holiday is on weekend.");
            var extraWeekend = extraDayCreator.createExtraWeekend(holiday);
            logger.debug("Extra weekend {} for holiday {} is created", extraWeekend, holiday);
            extraWeekendRepository.save(extraWeekend);
            logger.debug("Extra weekend for holiday created.");
        }

        logger.debug("Setting existing schedule holiday flag to true...");
        scheduleRepository.setHolidayByEnterpriseIdAndDate(true, holiday.getEnterpriseId(), holiday.getDate());
        return holiday;
    }

    @Override
    @Transactional
    public void delete(Holiday holiday) {
        logger.debug("Removing holiday {} from database...", holiday);
        var holidayDate = holiday.getDate();

        if (holidayDate.getDayOfWeek().compareTo(DayOfWeek.SATURDAY) == 0) {
            holidayRepository.findByDate(holidayDate.plusDays(1L))
                    .ifPresent(sundayHoliday -> {
                        extraWeekendRepository.findByHolidayId(sundayHoliday.getId())
                                .ifPresent(sundayHolidayExtraWeekend -> {
                                    // Deleting holiday and its extra weekend
                                    // to free date for the next holiday's extra weekend
                                    super.delete(holiday);
                                    sundayHolidayExtraWeekend
                                            .setDate(sundayHolidayExtraWeekend.getDate().minusDays(1L));
                                });
                    });
        }

        logger.debug("Setting existing schedule holiday flag to false...");
        scheduleRepository.setHolidayByEnterpriseIdAndDate(false, holiday.getEnterpriseId(), holiday.getDate());
        super.delete(holiday);
        logger.debug("Holiday {} is deleted.", holiday);
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
