import { WorkingNormRowData } from "../../../model/ui/working-norm-table/working-norm-row-data";
import { WorkingNorm } from "../../../model/working-norm";
import { CellData } from "../../../lib/ngx-schedule-table/model/data/cell-data";
import { BasicDto } from "../../../model/dto/basic-dto";
import { Shift } from "../../../model/shift";
import { Injectable } from "@angular/core";

@Injectable()
export class WorkingNormTableDataCollector {

  getRowData(dates: any, workingNormDtos: BasicDto<Shift, WorkingNorm>[]) {
    return workingNormDtos.map(dto => {
      let rowData = new WorkingNormRowData();
      rowData.id = dto.parent.id;
      rowData.shiftName = dto.parent.name;
      let shiftPattern = dto.parent.shiftPattern;
      rowData.patternName = shiftPattern ? shiftPattern.name : '-/-';
      rowData.cellData = this.getCellData(dates, dto.collection);
      return rowData;
    });
  }

  getCellData(dates: any[], arr: WorkingNorm[]) {
    let cellData: CellData[] = [];

    for (let dateIdx = 0, arrIdx = 0; dateIdx < dates.length; dateIdx++) {
      let date = dates[dateIdx].isoString;

      let cell = {
        date: date,
        value: null,
        enabled: true
      };

      let workingNorm = arr[arrIdx];
      if (workingNorm && (date === workingNorm.date)) {
        cell.value = workingNorm;
        arrIdx++;
      }

      cellData.push(cell);
    }

    return cellData;
  }
}
