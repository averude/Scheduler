import { CalendarDay } from "../../lib/ngx-schedule-table/model/calendar-day";
import { HasDate } from "../../model/interface/has-date";
import { CellData } from "../../lib/ngx-schedule-table/model/data/cell-data";
import { Injectable } from "@angular/core";

@Injectable()
export class CellCollector {

  public collect<T extends HasDate, R extends CellData>(dates: CalendarDay[],
                                                        hasDates: T[],
                                                        cellEnabled: boolean): R[] {
    let cellData: R[] = [];

    for (let dateIdx = 0, arrIdx = 0; dateIdx < dates.length; dateIdx++) {
      let date = dates[dateIdx];

      let cell: R = {
        date: date,
        value: null,
        enabled: cellEnabled
      } as R;

      let hasDate = hasDates[arrIdx];
      if (hasDate && (date.isoString === hasDate.date)) {
        cell.value = hasDate;
        arrIdx++;
      }

      cellData.push(cell);
    }

    return cellData;
  }
}
