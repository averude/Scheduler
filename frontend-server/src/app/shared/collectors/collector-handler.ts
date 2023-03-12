import { TableData } from "../../lib/ngx-schedule-table/model/data/table";
import { CalendarInitData } from "../../components/calendar/model/calendar-init-data";

export interface CollectorHandler {
  handle(initData: any, tableData: TableData);
}

export interface ICollectorHandler {
  handle(initData: CalendarInitData, tableData: TableData);
}
