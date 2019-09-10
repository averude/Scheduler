package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.entity.ExtraWeekend;
import com.averude.uksatse.scheduler.core.entity.Holiday;
import com.averude.uksatse.scheduler.core.extractor.TokenExtraDetailsExtractor;
import com.averude.uksatse.scheduler.shared.repository.ExtraWeekendRepository;
import com.averude.uksatse.scheduler.shared.repository.HolidayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class HolidayServiceImpl extends AbstractService<Holiday, Long>
        implements HolidayService {

    private final HolidayRepository holidayRepository;
    private final ExtraWeekendRepository extraWeekendRepository;
    private final ScheduleService scheduleService;
    private final TokenExtraDetailsExtractor detailsExtractor;

    @Autowired
    public HolidayServiceImpl(HolidayRepository holidayRepository,
                              ExtraWeekendRepository extraWeekendRepository,
                              ScheduleService scheduleService,
                              TokenExtraDetailsExtractor detailsExtractor) {
        super(holidayRepository);
        this.holidayRepository = holidayRepository;
        this.extraWeekendRepository = extraWeekendRepository;
        this.scheduleService = scheduleService;
        this.detailsExtractor = detailsExtractor;
    }

    @Override
    @Transactional
    public List<Holiday> findAllByDepartmentId(Long departmentId) {
        return holidayRepository.findAllByDepartmentId(departmentId);
    }

    @Override
    @Transactional
    public List<Holiday> findAllByAuth(Authentication authentication) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return findAllByDepartmentId(departmentId);
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
    public List<Holiday> findAllByAuthAndDateBetween(Authentication authentication,
                                                     LocalDate from,
                                                     LocalDate to) {
        Long departmentId = detailsExtractor
                .extractId(authentication, TokenExtraDetailsExtractor.DEPARTMENT_ID);
        return findAllByDepartmentIdAndDateBetween(departmentId, from, to);
    }

    @Override
    @Transactional
    public Holiday save(Holiday holiday) {
        holiday = super.save(holiday);

        LocalDate holidayDate = holiday.getDate();

        if (isWeekend(holidayDate)) {
            LocalDate nextWeekFirstDay = getNextWeekDayDate(holidayDate, DayOfWeek.MONDAY);

            ExtraWeekend extraWeekend = new ExtraWeekend();
            extraWeekend.setDepartmentId(holiday.getDepartmentId());
            extraWeekend.setHolidayId(holiday.getId());

            Optional<ExtraWeekend> existentWeekendOptional = extraWeekendRepository.findByDateAndDepartmentId(nextWeekFirstDay, holiday.getDepartmentId());

            if (existentWeekendOptional.isPresent()) {
                ExtraWeekend existentWeekend = existentWeekendOptional.get();
                Optional<Holiday> existentHolidayOptional = holidayRepository.findById(existentWeekend.getHolidayId());

                if (existentHolidayOptional.isPresent()) {
                    Holiday existentHoliday = existentHolidayOptional.get();
                    DayOfWeek dayOfWeek = existentHoliday.getDate().getDayOfWeek();

                    if (dayOfWeek.compareTo(DayOfWeek.SUNDAY) == 0) {
                        saveExtraWeekend(existentWeekend, existentWeekend.getDate().plusDays(1L));
                        saveExtraWeekend(extraWeekend, nextWeekFirstDay);
                    } else {
                        saveExtraWeekend(extraWeekend, nextWeekFirstDay.plusDays(1L));
                    }
                } else {
                    existentWeekend.setHolidayId(holiday.getId());
                    extraWeekendRepository.save(existentWeekend);
                }
            } else {
                saveExtraWeekend(extraWeekend, nextWeekFirstDay);
            }
        }

        scheduleService.setHoliday(holiday.getDepartmentId(), holiday.getDate());
        return holiday;
    }

    @Override
    @Transactional
    public void delete(Holiday holiday) {
        LocalDate holidayDate = holiday.getDate();

        if (holidayDate.getDayOfWeek().compareTo(DayOfWeek.SATURDAY) == 0) {
            Optional<Holiday> sundayHolidayOptional = holidayRepository.findByDate(holidayDate.plusDays(1L));
            if (sundayHolidayOptional.isPresent()) {
                super.delete(holiday);

                Holiday sundayHoliday = sundayHolidayOptional.get();
                extraWeekendRepository.findByHolidayId(sundayHoliday.getId())
                        .ifPresent(sundayHolidayExtraWeekend -> {
                            sundayHolidayExtraWeekend
                                    .setDate(sundayHolidayExtraWeekend.getDate().minusDays(1L));
                            extraWeekendRepository.save(sundayHolidayExtraWeekend);
                        });
            }
        }
        scheduleService.removeHoliday(holiday.getDepartmentId(), holiday.getDate());
        super.delete(holiday);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        this.findById(id).ifPresent(this::delete);
    }

    private boolean isWeekend(LocalDate localDate) {
        return localDate.getDayOfWeek().compareTo(DayOfWeek.SATURDAY) >= 0;
    }

    private LocalDate getNextWeekDayDate(LocalDate localDate, DayOfWeek dayOfWeek) {
        return localDate.plusWeeks(1L).with(dayOfWeek);
    }

    private void saveExtraWeekend(ExtraWeekend extraWeekend, LocalDate date) {
        extraWeekend.setDate(date);
        extraWeekendRepository.save(extraWeekend);
    }
}
