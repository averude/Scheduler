package com.averude.uksatse.scheduler.generator.reports;

import com.averude.uksatse.scheduler.core.entity.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface ReportGenerator {
    ByteArrayOutputStream createExcelReport(List<Employee> employees,
                                            List<WorkDay> workDays,
                                            List<LocalDate> dates,
                                            List<DayType> dayTypes,
                                            List<Holiday> holidays,
                                            List<ExtraWeekend> extraWeekends) throws IOException;
}
