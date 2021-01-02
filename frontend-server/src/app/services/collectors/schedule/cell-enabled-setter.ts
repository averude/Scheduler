import { Row, TableData } from "../../../model/ui/schedule-table/table-data";
import { Moment } from "moment";
import { Injectable } from "@angular/core";

@Injectable()
export class CellEnabledSetter {

  processRow(row: Row, from: Moment, to: Moment) {
    if (!row || !row.cellData || row.cellData.length === 0 || from.isAfter(to)) {
      return;
    }

    const cells = row.cellData;

    cells.forEach(cell => cell.enabled = false);

    row.intervals.forEach(interval => {
      const begin = from.isSameOrAfter(interval.from) ? from : interval.from;
      const end   = to.isSameOrBefore(interval.to) ? to : interval.to;

      let start_idx = begin.date() - 1;
      let end_idx   = end.date();

      for (let i = start_idx; i < end_idx; i++) {
        cells[i].enabled = true;
      }
    });
  }

  processTable(table: TableData) {
    table.groups.forEach(group => {
      group.rows.forEach((row: Row) => this.processRow(row, table.from, table.to));
    });
  }
}
