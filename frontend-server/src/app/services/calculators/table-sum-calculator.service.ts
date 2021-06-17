import { RowGroup } from "../../lib/ngx-schedule-table/model/data/row-group";
import { calculateHoursByHasTime, roundToTwo } from "../../shared/utils/utils";
import { Injectable } from "@angular/core"
import { Row } from "../../lib/ngx-schedule-table/model/data/row";

@Injectable()
export class TableSumCalculator {

  calculateWorkHoursSum(rowGroupData: RowGroup[], rowId?: number) {
    this.calculateRowGroupSum(rowGroupData, this.calcWorkHoursSum, rowId);
  }

  calculateHoursNormSum(rows: Row[], rowId?: number) {
    this.calculateRowSum(rows, this.calcNormHoursSum, rowId);
  }

  private calculateRowGroupSum(rowGroupData: RowGroup[],
                               fn: (row) => void,
                               rowId?: number) {
    if (rowGroupData) {
      rowGroupData.forEach(group => {
        let rows = group.rows;
        this.calculateRowSum(rows, fn, rowId);
      });
    }
  }

  private calculateRowSum(rows: Row[],
                          fn,
                          rowId?: number) {
    if (rows) {
      if (rowId && rowId > 0) rows = rows.filter(row => row.id === rowId);
      rows.forEach(row => fn(row));
    }
  }

  private calcWorkHoursSum(row: any) {
    if (!row) return;

    row.sum = roundToTwo(row.cells
      .map(cell => calculateHoursByHasTime(cell.value))
      .reduce((prev, curr) => prev + curr, 0));

    row.diff = roundToTwo(row.sum - row.workingNorm);
  }

  private calcNormHoursSum(row: any) {
    if (!row) return;

    row.sum = row.cells
      .map(cell => (cell.value) ? cell.value.hours : 0)
      .reduce((prev, curr) => prev + curr, 0);
  }
}
