import { CellData } from "../../lib/ngx-schedule-table/model/data/cell-data";
import { HasDate } from "../../model/interface/has-date";
import * as moment from "moment";
import { Injectable } from "@angular/core";

@Injectable()
export class CellUpdater {

  public updateCellData(cellData: CellData[],
                        values: HasDate[],
                        fn: (value: HasDate) => number = getDayCellIndex) {
    if (!values || values.length === 0) {
      return;
    }

    const cellIndexes = this.getCellStartIndex(values, fn);

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

  private getCellStartIndex(values: HasDate[],
                            fn: (value: HasDate) => number): {start: number, end: number} {
    const result = {
      start:  -1,
      end:    -1
    };

    if (values && values.length > 0) {
      result.start  = fn(values[0]);
      result.end    = fn(values[values.length - 1]);
    }

    return result;
  }
}

export function getDayCellIndex(value: HasDate) {
  let result = -1;

  if (!value) {
    return result;
  }

  const dayNumber = moment.utc(value.date).date();
  if (dayNumber > 0 && dayNumber <= 31) {
    result = dayNumber - 1;
  }

  return result;
}

export function getMonthCellIndex(value: HasDate) {
  let result = -1;

  if (!value) {
    return result;
  }

  const monthNumber = moment.utc(value.date).month();
  if (monthNumber >= 0 && monthNumber <= 11) {
    result = monthNumber;
  }

  return result;
}
