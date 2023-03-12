import { CollectorHandler } from "../../../../shared/collectors/collector-handler";
import { WorkingNormInitialData } from "../../model/initial-data";
import { TableData } from "../../../../lib/ngx-schedule-table/model/data/table";
import { Injectable } from "@angular/core";

@Injectable()
export class HeaderDataCollectorHandler implements CollectorHandler {

  handle(initData: WorkingNormInitialData, tableData: TableData) {
    tableData.from = initData.from;
    tableData.to = initData.to;

    const monthNum = tableData.to
      .clone()
      .add(1, 'day')
      .diff(tableData.from, 'month');

    const date = tableData.from.clone().startOf('month');
    const result = [];

    for (let monthIdx = 1; monthIdx <= 12; monthIdx++) {
      result.push({
        isoString: date.format("YYYY-MM-DD"),
        monthName: date.format("MMMM")
      });
      date.add(1, 'month');
    }

    tableData.headerData = result;
  }

}
