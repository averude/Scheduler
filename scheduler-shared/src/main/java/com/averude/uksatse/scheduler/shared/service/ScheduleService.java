package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.ScheduleDTO;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.validation.CheckDateParameters;
import org.springframework.security.core.Authentication;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;
import java.util.List;

public interface ScheduleService extends GenericService<WorkDay, Long> {
    @CheckDateParameters
    ScheduleDTO findScheduleByEmployeeIdAndDate(@Min(value = 1L, message = "{entity.id.size}")
                                                        Long employeeId,
                                                @NotNull(message = "{workDay.date.null}")
                                                        LocalDate from,
                                                        LocalDate to);

    @CheckDateParameters
    List<ScheduleDTO> findScheduleByDepartmentIdAndDate(@Min(value = 1L, message = "{entity.id.size}")
                                                               Long departmentId,
                                                        @NotNull(message = "{workDay.date.null}")
                                                               LocalDate from,
                                                               LocalDate to);

    @CheckDateParameters
    List<ScheduleDTO> findScheduleByShiftIdAndDate(@Min(value = 1L, message = "{entity.id.size}")
                                                                Long shiftId,
                                                   @NotNull(message = "{workDay.date.null}")
                                                                LocalDate from,
                                                                LocalDate to);

    @CheckDateParameters
    List<ScheduleDTO> findAllByAuthAndDate(Authentication authentication,
                                           LocalDate from,
                                           LocalDate to);

    void setHoliday(Long departmentId, LocalDate date);

    void removeHoliday(Long departmentId, LocalDate date);
}
