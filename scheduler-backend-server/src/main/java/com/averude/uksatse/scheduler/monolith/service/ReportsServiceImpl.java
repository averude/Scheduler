package com.averude.uksatse.scheduler.monolith.service;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.core.extractor.DataByAuthorityExtractor;
import com.averude.uksatse.scheduler.generator.reports.ReportGenerator;
import com.averude.uksatse.scheduler.shared.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static com.averude.uksatse.scheduler.generator.utils.GeneratorCommonUtil.getDatesBetween;

@Service
public class ReportsServiceImpl implements ReportsService {

    private final ReportGenerator reportGenerator;
    private final EmployeeRepository employeeRepository;
    private final ShiftRepository shiftRepository;
    private final ShiftCompositionRepository shiftCompositionRepository;
    private final ScheduleRepository scheduleRepository;
    private final DayTypeRepository dayTypeRepository;
    private final HolidayRepository holidayRepository;
    private final ExtraWeekendRepository extraWeekendRepository;
    private final DataByAuthorityExtractor extractor;

    @Autowired
    public ReportsServiceImpl(ReportGenerator reportGenerator,
                              EmployeeRepository employeeRepository,
                              ShiftRepository shiftRepository,
                              ShiftCompositionRepository shiftCompositionRepository,
                              ScheduleRepository scheduleRepository,
                              DayTypeRepository dayTypeRepository,
                              HolidayRepository holidayRepository,
                              ExtraWeekendRepository extraWeekendRepository,
                              DataByAuthorityExtractor extractor) {
        this.reportGenerator = reportGenerator;
        this.employeeRepository = employeeRepository;
        this.shiftRepository = shiftRepository;
        this.shiftCompositionRepository = shiftCompositionRepository;
        this.scheduleRepository = scheduleRepository;
        this.dayTypeRepository = dayTypeRepository;
        this.holidayRepository = holidayRepository;
        this.extraWeekendRepository = extraWeekendRepository;
        this.extractor = extractor;
    }

    @Override
    @Transactional
    public InputStreamResource generateReportByDepartmentId(Long departmentId,
                                                            LocalDate from,
                                                            LocalDate to) {
        try {
            List<Employee> employees = employeeRepository.findAllByDepartmentId(departmentId);
            return getReportAsStreamResource(departmentId, employees, from, to);
        } catch (IOException e) {
            throw new RuntimeException();
        }
    }

    @Override
    @Transactional
    public InputStreamResource generateReportByShiftId(Long shiftId,
                                                       LocalDate from,
                                                       LocalDate to) {
        return shiftRepository.findById(shiftId).map(shift -> {
            try {
                List<Employee> employees = shiftCompositionRepository
                        .findEmployeesByShiftIdAndDatesBetween(shiftId, from, to);
                return getReportAsStreamResource(shift.getDepartmentId(), employees, from, to);
            } catch (IOException e) {
                throw new RuntimeException();
            }
        }).orElseThrow(RuntimeException::new);
    }

    @Override
    @Transactional
    public InputStreamResource generateReportByAuth(Authentication authentication,
                                                    LocalDate from,
                                                    LocalDate to) {
        return extractor.getData(authentication,
                (departmentId, shiftId) -> generateReportByDepartmentId(departmentId, from, to),
                (departmentId, shiftId) -> generateReportByShiftId(shiftId, from, to));
    }

    private InputStreamResource getReportAsStreamResource(Long departmentId,
                                                          List<Employee> employees,
                                                          LocalDate from,
                                                          LocalDate to) throws IOException {
        List<WorkDay> schedule = scheduleRepository
                .findAllByEmployeeIdInAndDateBetweenOrderByDateAsc(employees
                        .stream()
                        .map(Employee::getId)
                        .collect(Collectors.toList()), from, to);
        List<DayType> dayTypes = dayTypeRepository.findAllByEnterpriseId(departmentId);
        List<LocalDate> dates = getDatesBetween(from, to);
        List<Holiday> holidays = holidayRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
        List<ExtraWeekend> extraWeekends = extraWeekendRepository.findAllByDepartmentIdAndDateBetween(departmentId, from, to);
        ByteArrayOutputStream outputStream = reportGenerator.createExcelReport(employees, schedule, dates, dayTypes, holidays, extraWeekends);
        return new InputStreamResource(new ByteArrayInputStream(outputStream.toByteArray()));
    }
}
