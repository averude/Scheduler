import { AbstractReportDataCollector } from "./abstract-report-data-collector";
import { WorkDay } from "../../../../model/workday";
import { DayType } from "../../../../model/day-type";
import { TIME_SHEET_REPORT } from "../model/report-types";
import {
  calculateHoursByHasTime,
  getCellValue,
  getCellValueExt,
  getEmployeeShortName
} from "../../../../shared/utils/utils";
import { ReportCellData } from "../model/report-cell-data";
import { TimeSheetStyles } from "../styles/time-sheet-styles";
import { SummationResult } from "../../../../model/dto/summation-dto";
import { Employee } from "../../../../model/employee";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";

export class TimeSheetReportDataCollector extends AbstractReportDataCollector {

  REPORT_TYPE: string = TIME_SHEET_REPORT;

  fillCellWithValue(cell: ReportCellData,
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

  setRowFirstCells(cellData: ReportCellData[],
                   dtoParent: Employee,
                   rowIndex: number) {
    cellData.push({
      value: [rowIndex + 1, null],
      style: [TimeSheetStyles.idCellStyle, TimeSheetStyles.lastIdCellStyle]
    });

    cellData.push({
      value: [getEmployeeShortName(dtoParent), dtoParent.position.shortName],
      style: [TimeSheetStyles.nameCellStyle, TimeSheetStyles.positionCellStyle]
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
      cell.style = [TimeSheetStyles.dataCellStyle, TimeSheetStyles.lastDataCellStyle];

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
    summations.forEach(cell =>
      cellData.push({
        value: cell.value,
        style: [TimeSheetStyles.sumCellStyle, TimeSheetStyles.lastSumCellStyle]
      }));
  }
  //
  // getReportCellData(rowData: ReportRowData, row_data_idx: number): ReportCellData[] {
  //   const cellData: ReportCellData[] = [];
  //
  //   cellData.push({
  //     value: [row_data_idx + 1, null],
  //     style: [TimeSheetStyles.idCellStyle, TimeSheetStyles.lastIdCellStyle]
  //   });
  //
  //   cellData.push({
  //     value: [rowData.name, rowData.position],
  //     style: [TimeSheetStyles.nameCellStyle, TimeSheetStyles.positionCellStyle]
  //   });
  //
  //   rowData.cellData.forEach(cell =>
  //     cellData.push({
  //       value: cell.value,
  //       style: [TimeSheetStyles.dataCellStyle, TimeSheetStyles.lastDataCellStyle]
  //     }));
  //
  //   rowData.summationResults.forEach(cell =>
  //     cellData.push({
  //       value: cell.value,
  //       style: [TimeSheetStyles.sumCellStyle, TimeSheetStyles.lastSumCellStyle]
  //     }));
  //
  //   return cellData;
  // }
}
