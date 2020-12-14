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
import { ReportCellData, ReportHeaderCell } from "../model/report-cell-data";
import { TimeSheetStyles } from "../styles/time-sheet-styles";
import { SummationResult } from "../../../../model/dto/summation-dto";
import { Employee } from "../../../../model/employee";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { SummationColumn } from "../../../../model/summation-column";
import { ReportData } from "../model/report-row-data";
import { ReportMarkup } from "../model/report-markup";
import { BasicDto } from "../../../../model/dto/basic-dto";

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


  collectRowCellData(dto: BasicDto<Employee, WorkDay>,
                     calendarDays: CalendarDay[],
                     dayTypes: DayType[],
                     summations: SummationResult[],
                     index: number): ReportCellData[] {
    if (!calendarDays || calendarDays.length <= 0) {
      return;
    }

    const result: ReportCellData[] = [].concat([
      {
        value: [index + 1, null],
        style: [TimeSheetStyles.idCellStyle, TimeSheetStyles.lastIdCellStyle]
      },
      {
        value: [getEmployeeShortName(dto.parent), dto.parent.position.shortName],
        style: [TimeSheetStyles.nameCellStyle, TimeSheetStyles.positionCellStyle]
      }
    ]);

    const workDays = dto.collection;
    for (let date_idx = 0, sched_idx = 0; date_idx < calendarDays.length; date_idx++) {
      const date = calendarDays[date_idx];
      const workDay = workDays[sched_idx];

      const cell = <ReportCellData>{};
      cell.style = this.getStyle(date);

      if (workDay && date.isoString === workDay.date) {
        this.fillCellWithValue(cell, workDay, dayTypes);
        sched_idx++;
      }

      result.push(cell);
    }

    summations.forEach(cell =>
      result.push({
        value: cell.value,
        style: [TimeSheetStyles.sumCellStyle, TimeSheetStyles.lastSumCellStyle]
      }));

    return result;
  }

  getHeaders(calendarDays: CalendarDay[],
             summationColumns: SummationColumn[]): ReportHeaderCell[] {
    const headers: ReportHeaderCell[] = [].concat([
      {
        value: '№',
        style: TimeSheetStyles.idHeaderCellStyle,
        merge: true,
        width: 3
      },
      {
        value: 'П.І.Б.',
        style: TimeSheetStyles.nameHeaderCellStyle,
        merge: true,
        width: 20
      },
    ]);

    calendarDays.forEach(day => headers.push({
      value: [null, day.dayOfMonth],
      style: this.getHeaderStyle(day),
      merge: false,
      width: 6
    }));

    summationColumns.forEach(column => headers.push({
      value: column.name,
      style: TimeSheetStyles.sumHeaderCellStyle,
      merge: true
    }));

    return headers;
  }

  afterDataInsert(data: ReportData) {
    data.reportMarkup = {
      sheet_row_start_num: 2,
      sheet_col_start_num: 2,
      table_header_height: 1,
      table_creator_interval: 3,
      table_data_row_step: 2,
      table_cols_before_data: 2,
      table_report_label: 'ТАБЕЛЬ'
    } as ReportMarkup;
  }

  private getHeaderStyle(day: CalendarDay) {
    let result = TimeSheetStyles.dataHeaderCellStyle;
    if (day.weekend) {
      result = TimeSheetStyles.weekendDataHeaderCellStyle;
    } else if (day.holiday) {
      result = TimeSheetStyles.holidayDataHeaderCellStyle;
    }
    return result;
  }

  private getStyle(day: CalendarDay) {
    let result = TimeSheetStyles.dataCellStyle;
    if (day.weekend) {
      result = TimeSheetStyles.weekendDataCellStyle;
    } else if (day.holiday) {
      result = TimeSheetStyles.holidayDataCellStyle;
    }
    return result;
  }
}
