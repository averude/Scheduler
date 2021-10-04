import { IData } from "../../model/datasource/initial-data";
import { TableData } from "../../lib/ngx-schedule-table/model/data/table";

export interface CollectorHandler {
  handle(initData: IData, tableData: TableData);
}
