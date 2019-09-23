package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.ScheduleDTO;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.extractor.DataByAuthorityExtractor;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import com.averude.uksatse.scheduler.shared.repository.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;

@Service
public class ScheduleServiceImpl
        extends AbstractService<WorkDay, Long> implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final EmployeeRepository employeeRepository;
    private final DataByAuthorityExtractor extractor;

    @Autowired
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository,
                               EmployeeRepository employeeRepository,
                               DataByAuthorityExtractor extractor) {
        super(scheduleRepository);
        this.scheduleRepository = scheduleRepository;
        this.employeeRepository = employeeRepository;
        this.extractor = extractor;
    }

    @Override
    @Transactional
    public ScheduleDTO findScheduleByEmployeeIdAndDate(Long employeeId,
                                                       LocalDate from,
                                                       LocalDate to) {
        return new ScheduleDTO(employeeId, scheduleRepository.findAllByEmployeeIdAndDateBetween(employeeId, from, to));
    }

    @Override
    @Transactional
    public List<ScheduleDTO> findScheduleByShiftIdAndDate(Long shiftId,
                                                          LocalDate from,
                                                          LocalDate to) {
        List<ScheduleDTO> shiftSchedule = new LinkedList<>();
        employeeRepository.findAllByShiftIdOrderByShiftIdAscSecondNameAscFirstNameAscPatronymicAsc(shiftId)
                .forEach(employee -> {
                    shiftSchedule.add(new ScheduleDTO(employee.getId(),
                            scheduleRepository.findAllByEmployeeIdAndDateBetween(employee.getId(), from, to)));
                });
        return shiftSchedule;
    }

    @Override
    @Transactional
    public List<ScheduleDTO> findScheduleByDepartmentIdAndDate(Long departmentId,
                                                               LocalDate from,
                                                               LocalDate to) {

        List<ScheduleDTO> departmentSchedule = new LinkedList<>();
        employeeRepository.findAllByDepartmentId(departmentId)
                .forEach(employee -> {
                    departmentSchedule.add(new ScheduleDTO(employee.getId(),
                            scheduleRepository.findAllByEmployeeIdAndDateBetween(employee.getId(), from, to)));
                });
        return departmentSchedule;
    }

    @Override
    @Transactional
    public List<ScheduleDTO> findAllByAuthAndDate(Authentication authentication,
                                                  LocalDate from,
                                                  LocalDate to) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> findScheduleByDepartmentIdAndDate(departmentId, from, to),
                (departmentId, shiftId) -> findScheduleByShiftIdAndDate(shiftId, from, to));
    }

    @Override
    @Transactional
    public void setHoliday(Long departmentId, LocalDate date) {
        scheduleRepository.findAllByDepartmentIdAndDate(departmentId, date)
                .forEach(workDay -> workDay.setHoliday(true));
    }

    @Override
    @Transactional
    public void removeHoliday(Long departmentId, LocalDate date) {
        scheduleRepository.findAllByDepartmentIdAndDate(departmentId, date)
                .forEach(workDay -> workDay.setHoliday(false));
    }
}
