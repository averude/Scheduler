import { AbstractReportDataCollector } from "./abstract-report-data-collector";
import { WorkDay } from "../../../../model/workday";
import { DayType } from "../../../../model/day-type";
import { CellData } from "../../../../lib/ngx-schedule-table/model/data/cell-data";
import { TIME_SHEET_REPORT } from "../model/report-types";
import { calculateHoursByHasTime, getCellValue, getCellValueExt } from "../../../../shared/utils/utils";

export class TimeSheetReportDataCollector extends AbstractReportDataCollector {

  REPORT_TYPE: string = TIME_SHEET_REPORT;

  fillCellWithValue(cell: CellData,
                    workDay: WorkDay,
                    dayTypes: DayType[]): void {
    const val = [];
    if (workDay.actualDayTypeId) {
      val[0] = getCellValueExt(workDay, dayTypes, (workDay) => workDay.actualDayTypeId);
      val[1] = getCellValueExt(workDay, dayTypes, (workDay) => workDay.scheduledDayTypeId);
    } else {
      val[0] = calculateHoursByHasTime(workDay);
      val[1] = getCellValue(workDay, dayTypes);
      if (val[0] == 0) val[0] = '';
    }
    cell.value = val;
  }
}
