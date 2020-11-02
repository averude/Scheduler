import { AbstractReportDataCollector } from "./abstract-report-data-collector";
import { WorkDay } from "../../../../model/workday";
import { DayType } from "../../../../model/day-type";
import { CellData } from "../../../../lib/ngx-schedule-table/model/data/cell-data";
import { getCellValue } from "../../../../shared/utils/utils";
import { SCHEDULE_REPORT } from "../model/report-types";

export class ScheduleReportDataCollector extends AbstractReportDataCollector{

  REPORT_TYPE: string = SCHEDULE_REPORT;

  fillCellWithValue(cell: CellData,
                    workDay: WorkDay,
                    dayTypes: DayType[]): void {
    cell.value = getCellValue(workDay, dayTypes);
  }
}
