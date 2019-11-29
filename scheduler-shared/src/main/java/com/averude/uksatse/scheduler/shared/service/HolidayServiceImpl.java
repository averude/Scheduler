package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.shared.extradays.ExtraDayGenerator;
import com.averude.uksatse.scheduler.shared.repository.ExtraWeekendRepository;
import com.averude.uksatse.scheduler.shared.repository.HolidayRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;

@Service
public class HolidayServiceImpl
        extends AbstractService<Holiday, Long> implements HolidayService {

    private static Logger logger = LoggerFactory.getLogger(HolidayService.class);

    private final ShiftRepository shiftRepository;
    private final HolidayRepository holidayRepository;
    private final ExtraWeekendRepository extraWeekendRepository;
    private final ScheduleService scheduleService;
    private final ExtraDayGenerator extraDayGenerator;

    @Autowired
    public HolidayServiceImpl(ShiftRepository shiftRepository,
                              HolidayRepository holidayRepository,
                              ExtraWeekendRepository extraWeekendRepository,
                              ScheduleService scheduleService,
                              ExtraDayGenerator extraDayGenerator) {
        super(holidayRepository);
        this.shiftRepository = shiftRepository;
        this.holidayRepository = holidayRepository;
        this.extraWeekendRepository = extraWeekendRepository;
        this.extraDayGenerator = extraDayGenerator;
        this.scheduleService = scheduleService;
    }

    @Override
    @Transactional
    public List<Holiday> findAllByDepartmentId(Long departmentId) {
        return holidayRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<Holiday> findAllByDepartmentIdAndDateBetween(Long departmentId,
                                                             LocalDate from,
                                                             LocalDate to) {
        return holidayRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public List<Holiday> findAllByShiftIdAndDateBetween(Long shiftId,
                                                        LocalDate from,
                                                        LocalDate to) {
        return shiftRepository.findById(shiftId)
                .map(shift -> holidayRepository.findAllByDepartmentIdAndDateBetween(shift.getDepartmentId(), from, to))
                .orElse(null);
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
            var extraWeekend = extraDayGenerator.createExtraWeekend(holiday);
            logger.debug("Extra weekend {} for holiday {} is created", extraWeekend, holiday);
            extraWeekendRepository.save(extraWeekend);
            logger.debug("Extra weekend for holiday created.");
        }

        logger.debug("Setting existing schedule holiday flag to true...");
        scheduleService.setHoliday(holiday.getDepartmentId(), holiday.getDate());
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
                                    // because of transaction it could be omitted
//                                    extraWeekendRepository.save(sundayHolidayExtraWeekend);
                                });
                    });
        }

        logger.debug("Setting existing schedule holiday flag to false...");
        scheduleService.removeHoliday(holiday.getDepartmentId(), holiday.getDate());
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
