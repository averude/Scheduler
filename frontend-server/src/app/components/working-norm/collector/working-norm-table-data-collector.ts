import { WorkingNormRow } from "../../../model/ui/working-norm-table/working-norm-row-data";
import { WorkingNorm } from "../../../model/working-norm";
import { BasicDTO } from "../../../model/dto/basic-dto";
import { Shift } from "../../../model/shift";
import { Injectable } from "@angular/core";
import { CellCollector } from "../../../services/collectors/cell-collector";
import { ShiftPattern } from "../../../model/shift-pattern";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { RowGroup } from "../../../lib/ngx-schedule-table/model/data/row-group";

@Injectable()
export class WorkingNormTableDataCollector {

  constructor(private cellCollector: CellCollector) {}

  getTableData(dates: any,
               workingNormDTOs: BasicDTO<Shift, WorkingNorm>[],
               shiftPatterns: ShiftPattern[]) {
    const tableData = new TableData();
    const rowGroup = new RowGroup();
    rowGroup.rows = this.getRowData(rowGroup, dates, workingNormDTOs, shiftPatterns);
    tableData.addGroup(rowGroup);
    return tableData;
  }

  getRowData(parent: RowGroup,
             dates: any,
             workingNormDTOs: BasicDTO<Shift, WorkingNorm>[],
             shiftPatterns: ShiftPattern[]): WorkingNormRow[] {
    return workingNormDTOs.map(dto => {
      let row     = new WorkingNormRow();
      row.parent  = parent;
      row.id      = dto.parent.id;
      row.value   = dto.parent;
      row.patternName = this.getPatternName(dto.parent, shiftPatterns);
      row.cells   = this.cellCollector.collect(dates, dto.collection, true);
      return row;
    }) // TODO: move to strategy?
      .sort((a, b) => (b.value.uiPriority - a.value.uiPriority) || (a.id - b.id));
  }

  getPatternName(shift: Shift,
                 shiftPatterns: ShiftPattern[]): string {
    return shiftPatterns?.find(pattern => pattern.id === shift.shiftPatternId)?.name || '-/-';
  }
}
