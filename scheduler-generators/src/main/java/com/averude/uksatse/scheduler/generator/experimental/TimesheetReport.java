package com.averude.uksatse.scheduler.generator.experimental;

import com.averude.uksatse.scheduler.generator.model.EmployeeReportData;
import com.averude.uksatse.scheduler.generator.model.Report;
import com.averude.uksatse.scheduler.generator.model.ReportData;
import com.averude.uksatse.scheduler.generator.model.ReportHeadData;

import java.io.ByteArrayOutputStream;
import java.time.LocalDate;
import java.util.List;

public class TimesheetReport implements Report<EmployeeReportData, List<LocalDate>> {
    @Override
    public void prepareSheet() {

    }

    @Override
    public void initHead(ReportHeadData<List<LocalDate>> headData) {

    }

    @Override
    public void setData(ReportData<EmployeeReportData> data) {

    }

    @Override
    public ByteArrayOutputStream getReportAsOutputStream() {
        return null;
    }
}
