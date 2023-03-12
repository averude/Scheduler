import { Injectable } from "@angular/core";
import { ICollectorHandler } from "../../../../shared/collectors/collector-handler";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";
import { CalendarInitData } from "../../model/calendar-init-data";

@Injectable()
export class HeaderDataCollectorHandler implements ICollectorHandler {

  handle(calendarInitData: CalendarInitData, tableData: TableData) {
    tableData.headerData = calendarInitData.calendarDays;
  }
}
