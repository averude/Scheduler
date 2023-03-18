import { ScheduleRow } from "../../components/calendar/model/table-data";
import { Moment } from "moment";
import { Injectable } from "@angular/core";
import { HasDuration } from "../../model/composition";

@Injectable()
export class CellEnabledSetter {

  processCells<T>(cells: T[],
                  intervals: HasDuration[],
                  from: Moment,
                  to: Moment,
                  cellFn: (cell: T) => void) {

    if (!cells || !intervals || cells.length === 0 || from.isAfter(to)) {
      return;
    }

    intervals.forEach(interval => {
      const begin = from.isSameOrAfter(interval.from) ? from : interval.from;
      const end   = to.isSameOrBefore(interval.to) ? to : interval.to;

      if (begin.isSameOrBefore(end)) {
        let start_idx = begin.date() - 1;
        let end_idx   = end.date();

        for (let i = start_idx; i < end_idx; i++) {
          cellFn(cells[i]);
        }
      }
    });
  }

  process(row: ScheduleRow) {
    this.processRow(row, row.parent.parent.from, row.parent.parent.to);
  }

  processRow(row: ScheduleRow, from: Moment, to: Moment) {
    row.cells.forEach(cell => cell.enabled = false);
    row.enabledCellCount = 0;

    this.processCells(row.cells, row.value.intervals, from, to,
      (cell => {
        row.enabledCellCount++;
        cell.enabled = true;
      })
    );
  }
}
