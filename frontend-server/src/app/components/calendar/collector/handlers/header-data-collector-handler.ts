import { Injectable } from "@angular/core";
import { CollectorHandler } from "../../../../shared/collectors/collector-handler";
import { InitialData } from "../../../../model/datasource/initial-data";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";

@Injectable()
export class HeaderDataCollectorHandler implements CollectorHandler {

  handle(initData: InitialData, tableData: TableData) {
    tableData.headerData = initData.calendarDays;
  }
}
