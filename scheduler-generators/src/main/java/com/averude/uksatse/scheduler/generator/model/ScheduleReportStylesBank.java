package com.averude.uksatse.scheduler.generator.model;

import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.Workbook;

public class ScheduleReportStylesBank implements StylesBank {

    private CellStyle headerCellStyle;
    private CellStyle holidayCellStyle;
    private CellStyle weekendCellStyle;
    private CellStyle scheduleCellStyle;
    private CellStyle employeeCellStyle;

    public ScheduleReportStylesBank(Workbook workbook) {
        headerCellStyle = workbook.createCellStyle();
        holidayCellStyle = workbook.createCellStyle();
        weekendCellStyle = workbook.createCellStyle();
        scheduleCellStyle = workbook.createCellStyle();
        employeeCellStyle = workbook.createCellStyle();
    }

    @Override
    public CellStyle getHeaderCellStyle() {
        return headerCellStyle;
    }

    @Override
    public CellStyle getHolidayCellStyle() {
        return holidayCellStyle;
    }

    @Override
    public CellStyle getWeekendCellStyle() {
        return weekendCellStyle;
    }

    @Override
    public CellStyle getScheduleCellStyle() {
        return scheduleCellStyle;
    }

    @Override
    public CellStyle getEmployeeCellStyle() {
        return employeeCellStyle;
    }
}
