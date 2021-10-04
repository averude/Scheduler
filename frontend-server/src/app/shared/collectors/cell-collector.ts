import { CalendarDay } from "../../lib/ngx-schedule-table/model/calendar-day";
import { HasDate } from "../../model/interface/has-date";
import { Cell } from "../../lib/ngx-schedule-table/model/data/cell";
import { Injectable } from "@angular/core";

@Injectable()
export class CellCollector {

  public collect<T extends HasDate, R extends Cell>(dates: CalendarDay[],
                                                    hasDates: T[],
                                                    cellEnabled: boolean): R[] {
    return this.collectByFn(dates, hasDates,
      (date => ({date: date, value: null, enabled: cellEnabled} as R)),
      ((cell, hasDate) => cell.value = hasDate));
  }

  public collectByFn<T extends HasDate, R>(dates: CalendarDay[],
                                           hasDates: T[],
                                           createCellFn: (date: CalendarDay) => R,
                                           onDateEquals: (cell: R, hasDate: T) => void): R[] {
    let cellData: R[] = [];

    for (let dateIdx = 0, arrIdx = 0; dateIdx < dates.length; dateIdx++) {
      let date = dates[dateIdx];

      let cell: R = createCellFn(date);

      let hasDate = hasDates[arrIdx];
      if (hasDate && (date.isoString === hasDate.date)) {
        onDateEquals(cell, hasDate);
        arrIdx++;
      }

      cellData.push(cell);
    }

    return cellData;
  }
}
