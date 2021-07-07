import { calculateHoursByHasTime, roundToTwo } from "../../shared/utils/utils";
import { Injectable } from "@angular/core"
import { Row } from "../../lib/ngx-schedule-table/model/data/row";
import { Composition } from "../../model/composition";
import { CellEnabledSetter } from "../collectors/schedule/cell-enabled-setter";
import { Moment } from "moment";
import { TableData } from "../../model/ui/schedule-table/table-data";
import { EmployeeScheduleDTO } from "../../model/dto/employee-schedule-dto";
import { binarySearch } from "../../shared/utils/collection-utils";

@Injectable()
export class TableSumCalculator {

  constructor(private cellEnabledSetter: CellEnabledSetter) {}

  calculateHoursNormSum(rows: Row[], rowId?: number) {
    this.calculateRowSum(rows, this.calcNormHoursSum, rowId);
  }

  private calculateRowSum(rows: Row[],
                          fn,
                          rowId?: number) {
    if (rows) {
      if (rowId && rowId > 0) rows = rows.filter(row => row.id === rowId);
      rows.forEach(row => fn(row));
    }
  }

  private calcNormHoursSum(row: any) {
    if (!row) return;

    row.sum = row.cells
      .map(cell => (cell.value) ? cell.value.hours : 0)
      .reduce((prev, curr) => prev + curr, 0);
  }

  cal(row: any, dtos: EmployeeScheduleDTO[]) {
    const table = <TableData> row.group.table;
    const dto = binarySearch(dtos, mid => mid.parent.id - row.id);
    this.calculateSum(row, dto.mainCompositions, table.from, table.to);
  }

  calc(tableData: TableData,
       dtos: EmployeeScheduleDTO[],
       rowId: number) {

    const dto = binarySearch(dtos, mid => mid.parent.id - rowId);
    tableData.forEachRowWithId(rowId, (row => {
      this.calculateSum(row, dto.mainCompositions, tableData.from, tableData.to);
    }));
  }

  calculateSum(row: any,
               mainCompositions: Composition[],
               from: Moment,
               to: Moment) {
    let sum = 0;

    this.cellEnabledSetter.processCells((<Row> row).cells, mainCompositions, from, to,
      (cell => sum += calculateHoursByHasTime(cell.value))
    );

    row.sum = roundToTwo(sum);
    row.diff = roundToTwo(row.sum - row.workingNorm);
  }
}
