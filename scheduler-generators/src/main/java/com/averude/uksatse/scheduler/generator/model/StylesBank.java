package com.averude.uksatse.scheduler.generator.model;

import org.apache.poi.ss.usermodel.CellStyle;

public interface StylesBank {
    CellStyle getHeaderCellStyle();
    CellStyle getHolidayCellStyle();
    CellStyle getWeekendCellStyle();
    CellStyle getScheduleCellStyle();
    CellStyle getEmployeeCellStyle();
}
