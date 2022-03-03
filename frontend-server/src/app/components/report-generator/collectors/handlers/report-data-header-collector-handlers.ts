import { CollectorHandler } from "../../../../shared/collectors/collector-handler";
import { ReportInitialData } from "../../model/report-initial-data";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";
import { Injectable } from "@angular/core";

@Injectable()
export class ReportDataHeaderCollectorHandler implements CollectorHandler {

  handle(initData: ReportInitialData, tableData: TableData) {
    const collectorStrategy = initData.collectorStrategy;
    tableData.headerData = collectorStrategy.getHeaders(initData);
  }
}
