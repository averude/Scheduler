import { calculateHoursByHasTime, roundToTwo } from "../../shared/utils/utils";
import { Injectable } from "@angular/core"
import { Row } from "../../lib/ngx-schedule-table/model/data/row";
import { Composition } from "../../model/composition";
import { CellEnabledSetter } from "../collectors/schedule/cell-enabled-setter";
import { Moment } from "moment";
import { TableData } from "../../lib/ngx-schedule-table/model/data/table";
import { EmployeeScheduleDTO } from "../../model/dto/employee-schedule-dto";
import { binarySearch } from "../../shared/utils/collection-utils";

@Injectable()
export class TableSumCalculator {

  constructor(private cellEnabledSetter: CellEnabledSetter) {}

  calculateTableHoursNormSum(tableData: TableData, rowId?: number) {
    if (rowId && rowId > 0) {
      tableData.forEachRowWithId(rowId, (row) => {
        this.calcNormHoursSum(row);
      });
    } else {
      tableData.forEachRow(row => this.calcNormHoursSum(row));
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
