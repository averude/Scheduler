import { FilteringStrategy } from "../../../lib/ngx-schedule-table/model/data/filtering-strategy";
import { TableData } from "../../../lib/ngx-schedule-table/model/data/table";
import { Injectable } from "@angular/core";
import { StatisticsEmployeeRow } from "../model/data.model";

@Injectable()
export class StatisticsFilteringStrategy implements FilteringStrategy {

  filter(tableData: TableData, value: string) {
    tableData.forEachRow((row: StatisticsEmployeeRow )=> {
      row.hidden = !row.employee.secondName.includes(value);
    });
  }

  clear(tableData: TableData) {
    tableData.forEachRow((row: StatisticsEmployeeRow) => {
      row.hidden = false;
    });
  }

}
