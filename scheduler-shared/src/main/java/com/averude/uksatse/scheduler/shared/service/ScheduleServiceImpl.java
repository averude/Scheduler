package com.averude.uksatse.scheduler.shared.service;

import com.averude.uksatse.scheduler.core.dto.ScheduleDTO;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import com.averude.uksatse.scheduler.core.extractor.DataByAuthorityExtractor;
import com.averude.uksatse.scheduler.shared.repository.EmployeeRepository;
import com.averude.uksatse.scheduler.shared.repository.ScheduleRepository;
import com.averude.uksatse.scheduler.shared.repository.ShiftCompositionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ScheduleServiceImpl
        extends AbstractService<WorkDay, Long> implements ScheduleService {

    private final ScheduleRepository scheduleRepository;
    private final ShiftCompositionRepository shiftCompositionRepository;
    private final EmployeeRepository employeeRepository;
    private final DataByAuthorityExtractor extractor;

    @Autowired
    public ScheduleServiceImpl(ScheduleRepository scheduleRepository,
                               ShiftCompositionRepository shiftCompositionRepository,
                               EmployeeRepository employeeRepository,
                               DataByAuthorityExtractor extractor) {
        super(scheduleRepository);
        this.scheduleRepository = scheduleRepository;
        this.shiftCompositionRepository = shiftCompositionRepository;
        this.employeeRepository = employeeRepository;
        this.extractor = extractor;
    }

    @Override
    @Transactional
    public ScheduleDTO findScheduleByEmployeeIdAndDate(Long employeeId,
                                                       LocalDate from,
                                                       LocalDate to) {
        return new ScheduleDTO(employeeId, scheduleRepository.findAllByEmployeeIdAndDateBetweenOrderByDateAsc(employeeId, from, to));
    }

    @Override
    @Transactional
    public List<ScheduleDTO> findScheduleByShiftIdAndDate(Long shiftId,
                                                          LocalDate from,
                                                          LocalDate to) {
        return shiftCompositionRepository.findAllByShiftIdAndToGreaterThanEqualAndFromLessThanEqual(shiftId, from, to)
                .stream()
                .map(shiftSchedule -> new ScheduleDTO(shiftSchedule.getEmployeeId(),
                        scheduleRepository.findAllByEmployeeIdAndDateBetweenOrderByDateAsc(shiftSchedule.getEmployeeId(), from, to)))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public List<ScheduleDTO> findScheduleByDepartmentIdAndDate(Long departmentId,
                                                               LocalDate from,
                                                               LocalDate to) {
        return employeeRepository.findAllByDepartmentId(departmentId)
                .stream()
                .map(employee -> new ScheduleDTO(employee.getId(),
                        scheduleRepository.findAllByEmployeeIdAndDateBetweenOrderByDateAsc(employee.getId(), from, to)))
                .collect(Collectors.toList());
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
