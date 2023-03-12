import { CollectorHandler } from "../../../../shared/collectors/collector-handler";
import { WorkingNormInitialData } from "../../model/initial-data";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../../lib/ngx-schedule-table/model/data/row-group";
import { WorkingNormRow, WorkingNormRowValue } from "../../../../model/ui/working-norm-table/working-norm-row-data";
import { Shift } from "../../../../model/shift";
import { ShiftPattern } from "../../../../model/shift-pattern";
import { CellCollector } from "../../../../shared/collectors/cell-collector";
import { Injectable } from "@angular/core";

@Injectable()
export class BodyDataCollectorHandler implements CollectorHandler {

  constructor(private cellCollector: CellCollector) {}

  handle(initData: WorkingNormInitialData, tableData: TableData) {
    const rowGroup = new RowGroup();
    rowGroup.rows = this.getRowData(rowGroup, tableData, initData);
    tableData.groups.push(rowGroup);
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

  getPatternName(shift: Shift,
                 shiftPatterns: ShiftPattern[]): string {
    return shiftPatterns?.find(pattern => pattern.id === shift.shiftPatternId)?.name || '-/-';
  }
}
