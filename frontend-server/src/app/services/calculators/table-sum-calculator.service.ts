import { calculateHoursByHasTime, roundToTwo } from "../../shared/utils/utils";
import { Injectable } from "@angular/core"
import { Row } from "../../lib/ngx-schedule-table/model/data/row";
import { Composition } from "../../model/composition";
import { CellEnabledSetter } from "../../shared/collectors/cell-enabled-setter";
import { Moment } from "moment";
import { TableData } from "../../lib/ngx-schedule-table/model/data/table";
import { EmployeeScheduleDTO } from "../../model/dto/employee-schedule-dto";

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

  cal(row: any, dtoMap: Map<number, EmployeeScheduleDTO>) {
    const table = <TableData> row.parent.parent;
    const dto = dtoMap.get(row.id);
    this.calculateSum(row, dto.mainCompositions, table.from, table.to);
  }

  calculateSum(row: any,
               mainCompositions: Composition[],
               from: Moment,
               to: Moment) {
    let sum = 0;

    this.cellEnabledSetter.processCells((<Row> row).cells, mainCompositions, from, to,
      (cell => sum += calculateHoursByHasTime(cell.value))
    );

    row.value.sum = roundToTwo(sum);
    row.value.diff = roundToTwo(row.value.sum - row.value.workingNorm);
  }
}
