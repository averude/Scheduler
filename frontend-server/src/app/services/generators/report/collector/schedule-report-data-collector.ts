import { AbstractReportDataCollector } from "./abstract-report-data-collector";
import { WorkDay } from "../../../../model/workday";
import { DayType } from "../../../../model/day-type";
import { getCellValue, getEmployeeShortName } from "../../../../shared/utils/utils";
import { SCHEDULE_REPORT } from "../model/report-types";
import { ReportCellData } from "../model/report-cell-data";
import { ScheduleReportStyles } from "../styles/schedule-report-styles";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { Employee } from "../../../../model/employee";
import { SummationResult } from "../../../../model/dto/summation-dto";

export class ScheduleReportDataCollector extends AbstractReportDataCollector {

  REPORT_TYPE: string = SCHEDULE_REPORT;

  fillCellWithValue(cell: ReportCellData,
                    workDay: WorkDay,
                    dayTypes: DayType[]): void {
    cell.value = getCellValue(workDay, dayTypes);
  }

  setRowFirstCells(cellData: ReportCellData[],
                   dtoParent: Employee,
                   rowIndex: number) {
    cellData.push({
      value: rowIndex + 1,
      style: ScheduleReportStyles.idCellStyle
    });

    cellData.push({
      value: getEmployeeShortName(dtoParent),
      style: ScheduleReportStyles.nameCellStyle
    });

    cellData.push({
      value: dtoParent.position.shortName,
      style: ScheduleReportStyles.positionCellStyle
    });
  }

  setRowDataCells(cellData: ReportCellData[],
                  workDays: WorkDay[],
                  dates: CalendarDay[],
                  dayTypes: DayType[],
                  rowIndex: number) {
    if (!workDays || !dates || dates.length == 0) {
      return;
    }

    for (let date_idx = 0, sched_idx = 0; date_idx < dates.length; date_idx++) {
      const date = dates[date_idx];
      const workDay = workDays[sched_idx];

      const cell = <ReportCellData>{};
      cell.style = this.getStyle(date);

      if (workDay && date.isoString === workDay.date) {
        this.fillCellWithValue(cell, workDay, dayTypes);
        sched_idx++;
      }

      cellData.push(cell);
    }
  }

  setRowSumDataCells(cellData: ReportCellData[],
                     summations: SummationResult[],
                     rowIndex: number) {
    summations.forEach(sum =>
      cellData.push({
        value: sum.value,
        style: ScheduleReportStyles.sumCellStyle
      }));
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
