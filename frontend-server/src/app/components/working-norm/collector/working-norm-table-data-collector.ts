import { WorkingNormRow } from "../../../model/ui/working-norm-table/working-norm-row-data";
import { WorkingNorm } from "../../../model/working-norm";
import { BasicDTO } from "../../../model/dto/basic-dto";
import { Shift } from "../../../model/shift";
import { Injectable } from "@angular/core";
import { CellCollector } from "../../../services/collectors/cell-collector";
import { ShiftPattern } from "../../../model/shift-pattern";

@Injectable()
export class WorkingNormTableDataCollector {

  constructor(private cellCollector: CellCollector) {}

  getRowData(dates: any,
             workingNormDTOs: BasicDTO<Shift, WorkingNorm>[],
             shiftPatterns: ShiftPattern[]) {
    return workingNormDTOs.map(dto => {
      let row = new WorkingNormRow();
      row.id = dto.parent.id;
      row.shiftName = dto.parent.name;
      row.patternName = this.getPatternName(dto.parent, shiftPatterns);
      row.cells = this.cellCollector.collect(dates, dto.collection, true);
      return row;
    });
  }

  getPatternName(shift: Shift,
                 shiftPatterns: ShiftPattern[]): string {
    return shiftPatterns?.find(pattern => pattern.id === shift.shiftPatternId)?.name || '-/-';
  }
}
