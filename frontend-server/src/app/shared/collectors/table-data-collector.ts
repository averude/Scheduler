import { TableData } from "../../lib/ngx-schedule-table/model/data/table"
import { TableSortingStrategy } from "../../lib/ngx-schedule-table/model/data/row-group";
import { Injectable } from "@angular/core";
import { CollectorHandler } from "./collector-handler";

@Injectable()
export class TableDataCollector {

  collect(initData: any,
          handlers: CollectorHandler[],
          tableSortingStrategy: TableSortingStrategy): TableData {
    const result = new TableData(tableSortingStrategy);
    handlers.forEach(handler => handler.handle(initData, result));
    return result;
  }

}
