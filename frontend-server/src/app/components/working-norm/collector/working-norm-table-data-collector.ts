import { WorkingNormRow, WorkingNormRowValue } from "../../../model/ui/working-norm-table/working-norm-row-data";
import { Shift } from "../../../model/shift";
import { Injectable } from "@angular/core";
import { CellCollector } from "../../../services/collectors/cell-collector";
import { ShiftPattern } from "../../../model/shift-pattern";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";
import { WorkingNormInitialData } from "../../../model/datasource/initial-data";

@Injectable()
export class WorkingNormTableDataCollector {

  constructor(private cellCollector: CellCollector) {}

  getTableData(initData: WorkingNormInitialData) {
    const tableData = new TableData();
    tableData.from = initData.from;
    tableData.to = initData.to;
    this.getHeaderData(tableData);
    const rowGroup = new RowGroup();
    rowGroup.rows = this.getRowData(rowGroup, tableData, initData);
    tableData.addGroup(rowGroup);
    return tableData;
  }

  getRowData(parent: RowGroup,
             tableData: TableData,
             initData: WorkingNormInitialData): WorkingNormRow[] {
    return initData.workingNormDTOs.map(dto => {
      let row     = new WorkingNormRow();
      row.parent  = parent;
      row.id      = dto.parent.id;
      row.value   = new WorkingNormRowValue();
      row.value.shift       = dto.parent;
      row.value.patternName = this.getPatternName(dto.parent, initData.shiftPatterns);
      row.cells   = this.cellCollector.collect(tableData.headerData, dto.collection, true);
      return row;
    }) // TODO: move to strategy?
      .sort((a, b) => (b.value.shift.uiPriority - a.value.shift.uiPriority) || (a.id - b.id));
  }

  getHeaderData(tableData: TableData) {
    this.calculateMonthInYear(tableData);
  }

  getPatternName(shift: Shift,
                 shiftPatterns: ShiftPattern[]): string {
    return shiftPatterns?.find(pattern => pattern.id === shift.shiftPatternId)?.name || '-/-';
  }

  calculateMonthInYear(tableData: TableData) {
    const monthNum = tableData.to
      .clone()
      .add(1, 'day')
      .diff(tableData.from, 'month');

    const date = tableData.from.clone().startOf('month');
    const result = [];

    for (let monthIdx = 1; monthIdx <= 12; monthIdx++) {
      result.push({
        isoString: date.format("YYYY-MM-DD"),
        monthName: date.format("MMMM")
      });
      date.add(1, 'month');
    }

    tableData.headerData = result;
  }
}
