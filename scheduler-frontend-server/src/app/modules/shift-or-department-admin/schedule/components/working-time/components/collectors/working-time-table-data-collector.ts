import { WorkingTimeRowData } from "../model/working-time-row-data";
import { WorkingTime } from "../../../../../../../model/working-time";
import { CellData } from "../../../../../../../lib/ngx-schedule-table/model/data/cell-data";
import { BasicDto } from "../../../../../../../model/dto/basic-dto";
import { Shift } from "../../../../../../../model/shift";
import { Injectable } from "@angular/core";

@Injectable()
export class WorkingTimeTableDataCollector {

  getRowData(dates: any, workingTimeDtos: BasicDto<Shift, WorkingTime>[]) {
    return workingTimeDtos.map(dto => {
      let rowData = new WorkingTimeRowData();
      rowData.id = dto.parent.id;
      rowData.shiftName = dto.parent.name;
      let shiftPattern = dto.parent.shiftPattern;
      rowData.patternName = shiftPattern ? shiftPattern.name : '-/-';
      rowData.cellData = this.getCellData(dates, dto.collection);
      return rowData;
    });
  }

  getCellData(dates: any[], arr: WorkingTime[]) {
    let cellData: CellData[] = [];

    for (let dateIdx = 0, arrIdx = 0; dateIdx < dates.length; dateIdx++) {
      let date = dates[dateIdx].isoString;

      let cell = {
        date: date,
        value: null,
        enabled: true
      };

      let workingTime = arr[arrIdx];
      if (workingTime && (date === workingTime.date)) {
        cell.value = workingTime;
        arrIdx++;
      }

      cellData.push(cell);
    }

    return cellData;
  }
}
