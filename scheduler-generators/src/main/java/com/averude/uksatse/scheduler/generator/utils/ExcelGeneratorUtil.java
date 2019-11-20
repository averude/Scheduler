package com.averude.uksatse.scheduler.generator.utils;

import com.averude.uksatse.scheduler.core.entity.DayType;
import com.averude.uksatse.scheduler.core.entity.Employee;
import com.averude.uksatse.scheduler.core.entity.WorkDay;
import org.apache.poi.hssf.usermodel.HSSFPalette;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.util.List;

public class ExcelGeneratorUtil {

    public static String getCellValue(WorkDay workDay, List<DayType> dayTypes) {
        String cellValue = String.valueOf(workDay.getHours());
        if (dayTypes != null && workDay.getDayTypeId() != null) {
            return dayTypes.stream()
                    .filter(dayType -> dayType.getId().equals(workDay.getDayTypeId()))
                    .findFirst()
                    .map(DayType::getLabel)
                    .orElse(cellValue);
        }
        return cellValue;
    }

    public static void setScheduleColumnWidth(Sheet sheet, int colWidth, int startColumn, int numOfColumns) {
        for (int i = startColumn; i < numOfColumns + startColumn; i++) {
            sheet.setColumnWidth(i, colWidth);
        }
    }

    public static void setBeforeScheduleColumnsWidth(Sheet sheet) {
        sheet.setColumnWidth(0, 1400);
        sheet.setColumnWidth(1, 6000);
    }

    public static String getEmployeeName(Employee employee) {
        return employee.getSecondName() + " " +
                employee.getFirstName().charAt(0) + ". " +
                employee.getPatronymic().charAt(0) + ".";
    }

    public static CellStyle getHeaderCellStyle(Workbook workbook, Font font) {
        CellStyle style = createBasicCellStyle(workbook, font);
        style.setFillForegroundColor(IndexedColors.LIGHT_YELLOW.index);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    public static CellStyle getWeekendCellStyle(Workbook workbook, Font font) {
        CellStyle style = createBasicCellStyle(workbook, font);
        style.setFillForegroundColor(IndexedColors.LIGHT_BLUE.index);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    public static CellStyle getHolidayCellStyle(Workbook workbook, Font font) {
        CellStyle style = createBasicCellStyle(workbook, font);
        style.setFillForegroundColor(IndexedColors.ROSE.index);
        style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
        return style;
    }

    public static CellStyle getScheduleCellStyle(Workbook workbook, Font font) {
        CellStyle style = createBasicCellStyle(workbook, font);
        return style;
    }

    public static CellStyle getEmployeeCellStyle(Workbook workbook, Font font) {
        CellStyle style = createBasicCellStyle(workbook, font);
        style.setAlignment(HorizontalAlignment.LEFT);
        return style;
    }

    public static Font getHeaderFont(Workbook workbook, short fontSize) {
        Font font = workbook.createFont();
        font.setFontHeightInPoints(fontSize);
        font.setBold(true);
        return font;
    }

    public static Font getTableFont(Workbook workbook, short fontSize) {
        Font font = workbook.createFont();
        font.setFontHeightInPoints(fontSize);
        return font;
    }

    public static void createCustomColorPalette(HSSFWorkbook workbook) {
        HSSFPalette palette = workbook.getCustomPalette();
        palette.setColorAtIndex(IndexedColors.LIGHT_YELLOW.getIndex(), (byte) 255,(byte) 255,(byte) 224);
        palette.setColorAtIndex(IndexedColors.LIGHT_BLUE.getIndex(), (byte) 0, (byte) 255, (byte) 255);
        palette.setColorAtIndex(IndexedColors.ROSE.getIndex(), (byte) 255, (byte) 192, (byte) 203);
    }

    public static CellStyle createBasicCellStyle(Workbook workbook, Font font) {
        CellStyle style = workbook.createCellStyle();
        style.setBorderBottom(BorderStyle.THIN);
        style.setBottomBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderLeft(BorderStyle.THIN);
        style.setLeftBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderRight(BorderStyle.THIN);
        style.setRightBorderColor(IndexedColors.BLACK.getIndex());
        style.setBorderTop(BorderStyle.THIN);
        style.setTopBorderColor(IndexedColors.BLACK.getIndex());
        style.setFont(font);
        style.setAlignment(HorizontalAlignment.CENTER_SELECTION);
        return style;
    }

    public static Cell createCellInRow(Row row, int index, String cellValue, CellStyle style) {
        Cell cell = row.createCell(index);
        cell.setCellValue(cellValue);
        cell.setCellStyle(style);
        return cell;
    }

    public static Cell createCellInRow(Row row, int index, int cellValue, CellStyle style) {
        Cell cell = row.createCell(index);
        cell.setCellValue(cellValue);
        cell.setCellStyle(style);
        return cell;
    }
}
