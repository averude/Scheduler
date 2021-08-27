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
    return row.employee.secondName.toLowerCase().includes(value.toLowerCase())
      || row.employee.firstName.toLowerCase().includes(value.toLowerCase())
      || row.employee.patronymic.toLowerCase().includes(value.toLowerCase())
      || row.position.name.toLowerCase().includes(value.toLowerCase())
      || row.position.shortName.toLowerCase().includes(value.toLowerCase());
  }

}
