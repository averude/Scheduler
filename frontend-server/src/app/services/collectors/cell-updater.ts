import { CellData } from "../../lib/ngx-schedule-table/model/data/cell-data";
import { HasDate } from "../../model/interface/has-date";
import * as moment from "moment";
import { Injectable } from "@angular/core";

@Injectable()
export class CellUpdater {

  public updateCellData(cellData: CellData[],
                        values: HasDate[]) {
    if (!values || values.length === 0) {
      return;
    }

    const cellIndexes = this.getCellStartIndex(values);

    if (cellIndexes.start < 0 || cellIndexes.end < 0) {
      return;
    }

    for (let cellIdx = cellIndexes.start, valueIdx = 0; cellIdx <= cellIndexes.end; cellIdx++) {

      let cell = cellData[cellIdx];

      if (valueIdx < values.length) {
        let value = values[valueIdx];
        if (cell.date.isoString == value.date) {
          valueIdx++;
          cellData[cellIdx].value = value;
        }
      }
    }
  }

  private getCellStartIndex(values: HasDate[]): {start: number, end: number} {
    const result = {
      start:  -1,
      end:    -1
    };

    if (values && values.length > 0) {
      result.start  = this.getDayCellIndex(values[0]);
      result.end    = this.getDayCellIndex(values[values.length - 1]);
    }

    return result;
  }

  private getDayCellIndex(values: HasDate): number {
    let result = -1;

    if (!values) {
      return result;
    }

    if (typeof values.date == 'string') {

    }
    const dayNumber = moment.utc(values.date).date();
    if (dayNumber > 0 && dayNumber <= 31) {
      result = dayNumber - 1;
    }

    return result;
  }
}
