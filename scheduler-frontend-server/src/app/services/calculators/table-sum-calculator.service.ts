import { RowGroupData } from "../../lib/ngx-schedule-table/model/data/row-group-data";
import { calculateWorkHoursByWorkDay } from "../../shared/utils/time-converter";
import { roundToTwo } from "../../shared/utils/utils";
import { Injectable } from "@angular/core"
import { RowData } from "../../lib/ngx-schedule-table/model/data/row-data";

@Injectable()
export class TableSumCalculator {

  calculateWorkHoursSum(rowGroupData: RowGroupData[], rowId?: number) {
    this.calculateRowGroupSum(rowGroupData, this.calcWorkHoursSum, rowId);
  }

  calculateHoursNormSum(rows: RowData[], rowId?: number) {
    this.calculateRowSum(rows, this.calcNormHoursSum, rowId);
  }

  private calculateRowGroupSum(rowGroupData: RowGroupData[], fn: (row) => void, rowId?: number) {
    if (rowGroupData) {
      rowGroupData.forEach(group => {
        let rows = group.rowData;
        this.calculateRowSum(rows, fn, rowId);
      });
    }
  }

  private calculateRowSum(rows: any[], fn, rowId?: number) {
    if (rows) {
      if (rowId && rowId > 0) rows = rows.filter(row => row.id === rowId);
      rows.forEach(row => fn(row));
    }
  }

  private calcWorkHoursSum(row: any) {
    if (!row) return;

    row.sum = row.cellData
      .map(cell => calculateWorkHoursByWorkDay(cell.value))
      .reduce((prev, curr) => prev + curr, 0);

    row.diff = roundToTwo(row.timeNorm - row.sum);
  }

  private calcNormHoursSum(row: any) {
    if (!row) return;

    row.sum = row.cellData
      .map(cell => (cell.value) ? cell.value.hours : 0)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
