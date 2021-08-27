import { FilteringStrategy } from "../../../lib/ngx-schedule-table/model/data/filtering-strategy";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { ScheduleRow } from "../../../model/ui/schedule-table/table-data";
import { Injectable } from "@angular/core";

@Injectable()
export class ScheduleFilteringStrategy implements FilteringStrategy {

  filter(tableData: TableData, value: string) {
    tableData.forEachRow((row: ScheduleRow) => {
      row.hidden = !this.filterRow(row, value);
    });
  }

  clear(tableData: TableData) {
    tableData.forEachRow((row: ScheduleRow) => {
      row.hidden = row.enabledCellCount === 0;
    });
  }

  private filterRow(row: ScheduleRow, value: string) {
    const filterStr = value.toLowerCase();

    return row.employee.secondName.toLowerCase().includes(filterStr)
      || row.employee.firstName.toLowerCase().includes(filterStr)
      || row.employee.patronymic.toLowerCase().includes(filterStr)
      || row.position.name.toLowerCase().includes(filterStr)
      || row.position.shortName.toLowerCase().includes(filterStr);
  }

}
