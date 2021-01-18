import { AbstractReportDataCollector } from "./abstract-report-data-collector";
import { WorkDay } from "../../../model/workday";
import { DayType } from "../../../model/day-type";
import { TIME_SHEET_REPORT } from "../../generators/report/model/report-types";
import {
  calculateHoursByHasTime,
  getCellValue,
  getCellValueExt,
  getEmployeeShortName
} from "../../../shared/utils/utils";
import { ReportCellData, ReportHeaderCell } from "../../generators/report/model/report-cell-data";
import { TimeSheetStyles } from "../../generators/report/styles/time-sheet-styles";
import { SummationResult } from "../../../model/dto/summation-dto";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { SummationColumn } from "../../../model/summation-column";
import { ReportData } from "../../generators/report/model/report-row-data";
import { ReportMarkup } from "../../generators/report/model/report-markup";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";
import * as moment from "moment";
import { CellEnabledSetter } from "../schedule/cell-enabled-setter";

export class TimeSheetReportDataCollector extends AbstractReportDataCollector {

  REPORT_TYPE: string = TIME_SHEET_REPORT;

  fillCellWithValue(cell: ReportCellData,
                    workDay: WorkDay,
                    dayTypes: DayType[],
                    useReportLabel?: boolean): void {
    cell.style  = this.getStyle(cell.date, false);
    cell.merge = false;
    const val = [];
    if (workDay.actualDayTypeId) {
      val[0] = getCellValueExt(workDay, dayTypes, (workDay) => workDay.actualDayTypeId, useReportLabel);
      val[1] = getCellValueExt(workDay, dayTypes, (workDay) => workDay.scheduledDayTypeId, useReportLabel);
    } else {
      val[0] = calculateHoursByHasTime(workDay);
      val[1] = getCellValue(workDay, dayTypes, useReportLabel);
      if (val[0] == 0) val[0] = '';
    }
    cell.value = val;
  }

  fillDisabledCell(cell: ReportCellData) {
    cell.style  = this.getStyle(cell.date, true);
    cell.merge = true;
    cell.value = ['', 'X'];
  }

  collectRowCellData(dto: EmployeeScheduleDTO,
                     calendarDays: CalendarDay[],
                     dayTypes: DayType[],
                     positionName: string,
                     summations: SummationResult[],
                     index: number,
                     useReportLabel?: boolean,
                     intervals?: RowInterval[]): ReportCellData[] {
    if (!calendarDays || calendarDays.length <= 0) {
      return;
    }

    const result: ReportCellData[] = [].concat([
      {
        value: [index + 1, null],
        style: [TimeSheetStyles.idCellStyle, TimeSheetStyles.lastIdCellStyle]
      },
      {
        value: [getEmployeeShortName(dto.parent), positionName],
        style: [TimeSheetStyles.nameCellStyle, TimeSheetStyles.positionCellStyle]
      }
    ]);

    this.collectCells(dto, calendarDays, intervals, dayTypes, useReportLabel)
      .forEach(cell => result.push(cell));

    summations.forEach(cell =>
      result.push({
        merge: true,
        value: ['', cell.value],
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

    data.tableData.forEach((value, index) => value.reportCellData[0].value[0] = index + 1);
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

  private getStyle(day: CalendarDay, disabled?: boolean) {
    let result = disabled ? TimeSheetStyles.disabledDataCellStyle : TimeSheetStyles.dataCellStyle;
    if (day.weekend) {
      result = disabled ? TimeSheetStyles.disabledWeekendDataCellStyle : TimeSheetStyles.weekendDataCellStyle;
    } else if (day.holiday) {
      result = disabled ? TimeSheetStyles.disabledHolidayDataCellStyle : TimeSheetStyles.holidayDataCellStyle;
    }
    return result;
  }

  private cellEnabledSetter: CellEnabledSetter = new CellEnabledSetter();

  private collectCells(dto: EmployeeScheduleDTO,
                       calendarDays: CalendarDay[],
                       intervals: RowInterval[],
                       dayTypes: DayType[],
                       useReportLabel: boolean) {

    const cells: ReportCellData[] = [];
    const workDays = dto.collection;

    for (let date_idx = 0, sched_idx = 0; date_idx < calendarDays.length; date_idx++) {
      const date = calendarDays[date_idx];
      const workDay = workDays[sched_idx];

      const cell  = <ReportCellData>{};
      cell.date   = date;
      this.fillDisabledCell(cell);

      if (workDay && date.isoString === workDay.date) {
        cell.workDay = workDay;
        sched_idx++;
      }

      cells.push(cell);
    }

    const from = moment.utc(calendarDays[0].isoString);
    const to = moment.utc(calendarDays[calendarDays.length - 1].isoString);

    this.cellEnabledSetter.processCells(cells, intervals, from, to, (cell => {
      this.fillCellWithValue(cell, cell.workDay, dayTypes, useReportLabel);
    }));

    return cells;
  }
}
