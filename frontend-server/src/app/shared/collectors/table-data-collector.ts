import { TableData } from "../../lib/ngx-schedule-table/model/data/table";
import { CollectorHandler } from "../../services/collectors/schedule/collector-handler";
import { TableSortingStrategy } from "../../lib/ngx-schedule-table/model/data/row-group";
import { Injectable } from "@angular/core";

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
