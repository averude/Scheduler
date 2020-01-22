import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.junit.Test;

import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

public class TestRowShift {
    @Test
    public void testShiftRow() {
        try(Workbook workbook = new HSSFWorkbook(this.getClass().getResourceAsStream("schedule-report.xls"));
            FileOutputStream fos = new FileOutputStream("test.xls")) {
            Sheet sheet = workbook.getSheetAt(0);
            shiftCells(sheet, 10, 17, 30, 38, 2);
            sheet.shiftRows(16, 20, 4);
            copyRows(sheet, 15, 4);
            sheet.getRow(16).cellIterator().forEachRemaining(cell -> cell.setCellValue(20));
            workbook.write(fos);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private void shiftCells(Sheet sheet, int fromRow, int toRow, int fromColumn, int toColumn, int step) {
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

    private void copyRows(Sheet sheet, int fromRow, int numOfCopies) {
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
