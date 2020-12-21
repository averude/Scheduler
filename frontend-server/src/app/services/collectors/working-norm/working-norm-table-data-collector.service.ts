import { WorkingNormRowData } from "../../../model/ui/working-norm-table/working-norm-row-data";
import { WorkingNorm } from "../../../model/working-norm";
import { BasicDto } from "../../../model/dto/basic-dto";
import { Shift } from "../../../model/shift";
import { Injectable } from "@angular/core";
import { CellCollector } from "../cell-collector";
import { ShiftPattern } from "../../../model/shift-pattern";

@Injectable()
export class WorkingNormTableDataCollector {

  constructor(private cellCollector: CellCollector) {}

  getRowData(dates: any,
             workingNormDtos: BasicDto<Shift, WorkingNorm>[],
             shiftPatterns: ShiftPattern[]) {
    return workingNormDtos.map(dto => {
      let rowData = new WorkingNormRowData();
      rowData.id = dto.parent.id;
      rowData.shiftName = dto.parent.name;
      rowData.patternName = this.getPatternName(dto.parent, shiftPatterns);
      rowData.cellData = this.cellCollector.collect(dates, dto.collection, true);
      return rowData;
    });
  }

  getPatternName(shift: Shift,
                 shiftPatterns: ShiftPattern[]): string {
    return shiftPatterns?.find(pattern => pattern.id === shift.shiftPatternId)?.name || '-/-';
  }
}
