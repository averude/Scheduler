import { AbstractReportDataCollector } from "./abstract-report-data-collector";
import { WorkDay } from "../../../../model/workday";
import { DayType } from "../../../../model/day-type";
import { CellData } from "../../../../lib/ngx-schedule-table/model/data/cell-data";
import { getCellValue } from "../../../../shared/utils/utils";
import { SCHEDULE_REPORT } from "../model/report-types";
import { ReportCellData } from "../model/report-cell-data";
import { ReportRowData } from "../model/report-row-data";
import { ScheduleReportStyles } from "../styles/schedule-report-styles";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";

export class ScheduleReportDataCollector extends AbstractReportDataCollector{

  REPORT_TYPE: string = SCHEDULE_REPORT;

  fillCellWithValue(cell: CellData,
                    workDay: WorkDay,
                    dayTypes: DayType[]): void {
    cell.value = getCellValue(workDay, dayTypes);
  }

  getReportCellData(rowData: ReportRowData, row_data_idx: number): ReportCellData[] {
    const cellData: ReportCellData[] = [];

    cellData.push({
      value: row_data_idx + 1,
      style: ScheduleReportStyles.idCellStyle
    });

    cellData.push({
      value: rowData.name,
      style: ScheduleReportStyles.nameCellStyle
    });

    cellData.push({
      value: rowData.position,
      style: ScheduleReportStyles.positionCellStyle
    });

    rowData.cellData.forEach(cell =>
      cellData.push({
        value: cell.value,
        style: this.getStyle(cell.date)
      }));

    rowData.summationResults.forEach(cell =>
      cellData.push({
        value: cell.value,
        style: ScheduleReportStyles.sumCellStyle
      }));

    return cellData;
  }

  private getStyle(day: CalendarDay) {
    let result = ScheduleReportStyles.scheduleCellStyle;
    if (day.weekend) {
      result = ScheduleReportStyles.weekendScheduleCellStyle;
    } else if (day.holiday) {
      result = ScheduleReportStyles.holidayScheduleCellStyle;
    }
    return result;
  }
}
