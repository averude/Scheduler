import { calculateHoursByHasTime, roundToTwo } from "../../shared/utils/utils";
import { Injectable } from "@angular/core"
import { Row } from "../../lib/ngx-schedule-table/model/data/row";
import { Composition } from "../../model/composition";
import { CellEnabledSetter } from "../../shared/collectors/cell-enabled-setter";
import { TableData } from "../../lib/ngx-schedule-table/model/data/table";
import { InitialData } from "../../model/datasource/initial-data";
import { WorkDay } from "../../model/workday";
import { RatioColumn } from "../../model/ratio-column";

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

  calculate(row: Row,
            initData: InitialData) {
    const dto = initData.scheduleDTOMap.get(row.id);
    this.calculateRow(row, dto.mainCompositions, initData);
  }

  calculateRow(row: Row,
               mainCompositions: Composition[],
               initData: InitialData) {
    let sum = 0;
    const rowCells = row.cells;
    const rowValue = row.value;
    const workingNorm = rowValue.workingNorm;

    this.cellEnabledSetter.processCells(rowCells, mainCompositions, initData.from, initData.to,
      (cell => sum += calculateHoursByHasTime(cell.value)));

    rowValue.sum = roundToTwo(sum);
    rowValue.diff = roundToTwo(rowValue.sum - workingNorm);

    const ratioColumns: RatioColumn[] = initData.ratioColumns;
    if (ratioColumns && workingNorm) {
      rowValue.userCols = ratioColumns.map(col => {
        const ratioDayTypeId: number = col.dayTypeId;

        let stsSum = 0;
        const cells = rowCells
          .filter(cell => (<WorkDay> cell.value)?.scheduledDayTypeId === ratioDayTypeId);
        this.cellEnabledSetter.processCells(cells, mainCompositions, initData.from, initData.to,
          (cell => stsSum += calculateHoursByHasTime(cell?.value)));

        return roundToTwo((rowValue.sum - stsSum) / workingNorm);
      });
    }
  }
}
