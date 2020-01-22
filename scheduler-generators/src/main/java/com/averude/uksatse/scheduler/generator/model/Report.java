package com.averude.uksatse.scheduler.generator.model;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public interface Report<T, H> {
    void prepareSheet();
    void initHead(ReportHeadData<H> headData);
    void setData(ReportData<T> data);
    ByteArrayOutputStream getReportAsOutputStream() throws IOException;
}
