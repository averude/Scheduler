package com.averude.uksatse.scheduler.generator.reports;

import com.averude.uksatse.scheduler.core.entity.*;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import static com.averude.uksatse.scheduler.generator.utils.ExcelGeneratorUtil.*;

@Component
public class ReportGeneratorImpl implements ReportGenerator {

    public ByteArrayOutputStream createExcelReport(List<Employee> employees,
                                                   List<WorkDay> workDays,
                                                   List<LocalDate> dates,
                                                   List<DayType> dayTypes,
                                                   List<Holiday> holidays,
                                                   List<ExtraWeekend> extraWeekends) throws IOException {
        try (HSSFWorkbook workbook = new HSSFWorkbook();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            short fontSize = 14;
            String[] colsBeforeDates = {"#", "Name"};
            createCustomColorPalette(workbook);

            Font headerFont = getHeaderFont(workbook, fontSize);
            Font tableFont  = getTableFont(workbook, fontSize);

            Sheet sheet = workbook.createSheet();
            setBeforeScheduleColumnsWidth(sheet);
            setScheduleColumnWidth(sheet, 2000, colsBeforeDates.length, dates.size());

            // Header Cell Styles
            CellStyle headerCellStyle         = getHeaderCellStyle(workbook, headerFont);
            CellStyle weekendHeaderCellStyle  = getWeekendCellStyle(workbook, headerFont);
            CellStyle holidayHeaderCellStyle  = getHolidayCellStyle(workbook, headerFont);

            // Table Cell Styles
            CellStyle weekendCellStyle  = getWeekendCellStyle(workbook, tableFont);
            CellStyle holidayCellStyle  = getHolidayCellStyle(workbook, tableFont);
            CellStyle scheduleCellStyle = getScheduleCellStyle(workbook, tableFont);
            CellStyle employeeCellStyle = getEmployeeCellStyle(workbook, tableFont);

            createHeaderRow(sheet, colsBeforeDates, dates, holidays, extraWeekends,
                    headerCellStyle, weekendHeaderCellStyle, holidayHeaderCellStyle);

            createTableRows(sheet, employees, workDays, dayTypes, extraWeekends, employeeCellStyle,
                    scheduleCellStyle, weekendCellStyle, holidayCellStyle);

            workbook.write(out);
            return out;
        }
    }

    private void createHeaderRow(Sheet sheet,
                                 String[] colsBeforeDates,
                                 List<LocalDate> dates,
                                 List<Holiday> holidays,
                                 List<ExtraWeekend> extraWeekends,
                                 CellStyle headerCellStyle,
                                 CellStyle weekendCellStyle,
                                 CellStyle holidayCellStyle) {
        // The header row
        Row headerRow = sheet.createRow(0);
        int numOfColsBefore = colsBeforeDates.length;
        for (int i = 0; i < numOfColsBefore; i++) {
            createCellInRow(headerRow, i, colsBeforeDates[i], headerCellStyle);
        }

        // Days in header
        for (int col = numOfColsBefore, i = 0; i < dates.size(); col++, i++) {
            LocalDate date = dates.get(i);
            if (isWeekend(date, extraWeekends)) {
                createCellInRow(headerRow, col, date.getDayOfMonth(), weekendCellStyle);
            } else {
                createCellInRow(headerRow, col, date.getDayOfMonth(), headerCellStyle);
            }
        }

        for (Holiday holiday : holidays) {
            int cellIndex = holiday.getDate().getDayOfMonth() + numOfColsBefore - 1;
            headerRow.getCell(cellIndex).setCellStyle(holidayCellStyle);
        }
    }

    private void createTableRows(Sheet sheet,
                                 List<Employee> employees,
                                 List<WorkDay> workDays,
                                 List<DayType> dayTypes,
                                 List<ExtraWeekend> extraWeekends,
                                 CellStyle employeeCellStyle,
                                 CellStyle scheduleCellStyle,
                                 CellStyle weekendCellStyle,
                                 CellStyle holidayCellStyle) {
        // An employee's rows
        for (int i = 0, rowIndex = 1; i < employees.size(); i++, rowIndex++) {
            Row employeeRow = sheet.createRow(rowIndex);
            createCellInRow(employeeRow, 0, rowIndex, scheduleCellStyle);

            Employee employee = employees.get(i);
            String employeeName = getEmployeeName(employee);
            List<WorkDay> employeeSchedule = workDays.stream()
                    .filter(workDay -> workDay.getEmployeeId().equals(employee.getId()))
                    .collect(Collectors.toList());

            createCellInRow(employeeRow, 1, employeeName, employeeCellStyle);

            for (WorkDay workDay : employeeSchedule) {
                LocalDate date = workDay.getDate();
                if (workDay.getHoliday()) {
                    createCellInRow(employeeRow,
                            date.getDayOfMonth() + 1,
                            getCellValue(workDay, dayTypes),
                            holidayCellStyle);
                } else if (isWeekend(date, extraWeekends)){
                    createCellInRow(employeeRow,
                            date.getDayOfMonth() + 1,
                            getCellValue(workDay, dayTypes),
                            weekendCellStyle);
                } else {
                    createCellInRow(employeeRow,
                            date.getDayOfMonth() + 1,
                            getCellValue(workDay, dayTypes),
                            scheduleCellStyle);
                }
            }
        }
    }

    private boolean isWeekend(LocalDate date, List<ExtraWeekend> extraWeekends){
        int dayOfWeek = date.getDayOfWeek().getValue();
        return dayOfWeek == 6 || dayOfWeek == 7 || extraWeekends.stream()
                .anyMatch(extraWeekend -> extraWeekend.getDate().equals(date));
    }
}
