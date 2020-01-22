package com.averude.uksatse.scheduler.generator.experimental;

import com.averude.uksatse.scheduler.core.entity.*;
import com.averude.uksatse.scheduler.generator.model.*;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class ScheduleReport implements Report<EmployeeReportData, List<LocalDate>> {

    private Workbook workbook;
    private Sheet sheet;
    private StylesBank stylesBank;

    private ReportHeadData<List<LocalDate>> headData;
    private ReportData<EmployeeReportData> reportData;

    private List<DayType> dayTypes;
    private List<Holiday> holidays;
    private List<ExtraWeekend> extraWeekends;

    public ScheduleReport(ReportHeadData<List<LocalDate>> headData,
                          ReportData<EmployeeReportData> reportData,
                          List<DayType> dayTypes,
                          List<Holiday> holidays,
                          List<ExtraWeekend> extraWeekends) throws IOException {
        this.workbook = new HSSFWorkbook(this.getClass().getResourceAsStream("schedule-report.xls"));
        this.stylesBank = new ScheduleReportStylesBank(workbook);
        this.headData = headData;
        this.reportData = reportData;
        this.dayTypes = dayTypes;
        this.holidays = holidays;
        this.extraWeekends = extraWeekends;
    }

    @Override
    public void prepareSheet() {
        sheet = workbook.getSheetAt(0);

        int daysInMonth = headData.getHeadData().size();
        int numberOfRows = reportData.getData().size();

        shiftCells(sheet, 10, 17, 30, 38, 31 - daysInMonth);
        insertBetweenRows(sheet, 15, numberOfRows - 2);
    }

    @Override
    public void initHead(ReportHeadData<List<LocalDate>> headData) {
        List<LocalDate> dates = headData.getHeadData();
//        var colsBeforeDates = new String[]{"#", "Name", "Pos"};
//
//        // The header row
//        Row headerRow = sheet.createRow(0);
//        int numOfColsBefore = colsBeforeDates.length;
//        for (int i = 0; i < numOfColsBefore; i++) {
//            createCellInRow(headerRow, i, colsBeforeDates[i], stylesBank.getHeaderCellStyle());
//        }
//
//        // Days in header
//        for (int col = numOfColsBefore, i = 0; i < dates.size(); col++, i++) {
//            LocalDate date = dates.get(i);
//            if (isWeekend(date, extraWeekends)) {
//                createCellInRow(headerRow, col, date.getDayOfMonth(), stylesBank.getWeekendCellStyle());
//            } else {
//                createCellInRow(headerRow, col, date.getDayOfMonth(), stylesBank.getHeaderCellStyle());
//            }
//        }
//
//        for (Holiday holiday : holidays) {
//            int cellIndex = holiday.getDate().getDayOfMonth() + numOfColsBefore - 1;
//            headerRow.getCell(cellIndex).setCellStyle(stylesBank.getHolidayCellStyle());
//        }
    }

    @Override
    public void setData(ReportData<EmployeeReportData> data) {
        List<EmployeeReportData> employeeRows = data.getData();

        for (int i = 0, rowIndex = 1; i < employeeRows.size(); i++, rowIndex++) {
            EmployeeReportData employeeReportData = employeeRows.get(i);
            Row row = sheet.createRow(rowIndex);

            createCellInRow(row, 0, rowIndex, stylesBank.getScheduleCellStyle());
            createCellInRow(row, 1, employeeReportData.getEmployeeName(), stylesBank.getEmployeeCellStyle());
            createCellInRow(row, 2, employeeReportData.getEmployeePosition(), stylesBank.getScheduleCellStyle());

            List<WorkDay> employeeSchedule = employeeReportData.getEmployeeSchedule();
            for (int scheduleIndex = 0; scheduleIndex < employeeSchedule.size(); scheduleIndex++) {
                createScheduleCellInRow(row, employeeSchedule.get(scheduleIndex), 1);
            }
        }
    }

    private void createScheduleCellInRow(Row employeeRow, WorkDay workDay, int offset) {
        LocalDate date = workDay.getDate();
        if (workDay.getHoliday()) {
            createCellInRow(employeeRow,
                    date.getDayOfMonth() + offset,
                    getCellValue(workDay, dayTypes),
                    stylesBank.getHolidayCellStyle());
        } else if (isWeekend(date, extraWeekends)) {
            createCellInRow(employeeRow,
                    date.getDayOfMonth() + offset,
                    getCellValue(workDay, dayTypes),
                    stylesBank.getWeekendCellStyle());
        } else {
            createCellInRow(employeeRow,
                    date.getDayOfMonth() + offset,
                    getCellValue(workDay, dayTypes),
                    stylesBank.getScheduleCellStyle());
        }
    }

    @Override
    public ByteArrayOutputStream getReportAsOutputStream() throws IOException {
        try (ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            workbook.write(out);
            return out;
        } finally {
            workbook.close();
        }
    }

    private String getCellValue(WorkDay workDay, List<DayType> dayTypes) {
        String cellValue = String.valueOf(workDay.getEndTime());
        if (dayTypes != null && workDay.getDayTypeId() != null) {
            return dayTypes.stream()
                    .filter(dayType -> dayType.getId().equals(workDay.getDayTypeId()))
                    .findFirst()
                    .map(DayType::getLabel)
                    .orElse(cellValue);
        }
        return cellValue;
    }

    private Cell createCellInRow(Row row, int cellIndex, int cellValue, CellStyle style) {
        Cell cell = row.createCell(cellIndex);
        cell.setCellValue(cellValue);
        cell.setCellStyle(style);
        return cell;
    }

    private Cell createCellInRow(Row row, int cellIndex, String cellValue, CellStyle style) {
        Cell cell = row.createCell(cellIndex);
        cell.setCellValue(cellValue);
        cell.setCellStyle(style);
        return cell;
    }

    private boolean isWeekend(LocalDate date, List<ExtraWeekend> extraWeekends){
        int dayOfWeek = date.getDayOfWeek().getValue();
        return dayOfWeek == 6 || dayOfWeek == 7 || extraWeekends.stream()
                .anyMatch(extraWeekend -> extraWeekend.getDate().equals(date));
    }

    private void shiftCells(Sheet sheet, int fromRow, int toRow, int fromColumn, int toColumn, int step) {
        if (step <= 0) {
            return;
        }
        for (int index = fromRow; index <= toRow; index++) {
            shiftCellsInRow(sheet.getRow(index), fromColumn, toColumn, step);
        }
    }

    private void shiftCellsInRow(Row row, int fromCell, int toCell, int step) {
        for (int i = fromCell - 1; i >= fromCell - step; i--) {
            row.createCell(i);
        }
        for (int i = fromCell; i <= toCell; i++) {
            Cell oldCell = row.getCell(i);
            Cell newCell = row.createCell(i - step);
            if (oldCell != null) {
                newCell.setCellStyle(oldCell.getCellStyle());
                row.removeCell(oldCell);
            }
        }
    }

    private void insertBetweenRows(Sheet sheet, int fromRow, int numOfCopies) {
        sheet.shiftRows(fromRow + 1, fromRow + 5, numOfCopies);

        var newRows = new ArrayList<Row>(numOfCopies);

        for (int i = fromRow + 1; i <= fromRow + numOfCopies; i++) {
            newRows.add(sheet.createRow(i));
        }
        sheet.getRow(fromRow)
                .cellIterator()
                .forEachRemaining(cell -> {
                    newRows.forEach(row -> row.createCell(cell.getColumnIndex()).setCellStyle(cell.getCellStyle()));
                });
    }
}
