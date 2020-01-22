package com.averude.uksatse.scheduler.generator.experimental;

import com.averude.uksatse.scheduler.generator.model.EmployeeReportData;
import com.averude.uksatse.scheduler.generator.model.Report;
import com.averude.uksatse.scheduler.generator.model.ReportData;
import com.averude.uksatse.scheduler.generator.model.ReportHeadData;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public class ReportsFactory {

    public ByteArrayOutputStream generateTimesheetReport(ReportHeadData<List<LocalDate>> headData,
                                                         ReportData<EmployeeReportData> reportData) throws IOException {
        TimesheetReport report = new TimesheetReport();
        return generateReport(report, headData, reportData);
    }

    public ByteArrayOutputStream generateScheduleReport(ReportHeadData<List<LocalDate>> headData,
                                                        ReportData<EmployeeReportData> reportData) {
//        ScheduleReport report = new ScheduleReport();
//        return generateReport(report, headData, reportData);
        return null;
    }

    private <T, H> ByteArrayOutputStream generateReport(Report<T, H> report,
                                                        ReportHeadData<H> headData,
                                                        ReportData<T> reportData) throws IOException {
        report.prepareSheet();
        report.initHead(headData);
        report.setData(reportData);
        return report.getReportAsOutputStream();
    }
}
