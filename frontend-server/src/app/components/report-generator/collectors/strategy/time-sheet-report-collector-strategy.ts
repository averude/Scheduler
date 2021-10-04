import { TIME_SHEET_REPORT } from "../../model/report-types";
import { ReportCellValue, ReportHeaderCell } from "../../model/report-cell-value";
import { WorkDay } from "../../../../model/workday";
import { DayType } from "../../../../model/day-type";
import {
  calculateHoursByHasTime,
  getCellValue,
  getCellValueExt,
  getEmployeeShortName
} from "../../../../shared/utils/utils";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { SummationResult } from "../../../../model/dto/employee-work-stat-dto";
import { RowInterval } from "../../../../model/ui/schedule-table/row-interval";
import { TimeSheetStyles } from "../../styles/time-sheet-styles";
import { SummationColumn } from "../../../../model/summation-column";
import { ReportCollectorStrategy } from "./report-collector-strategy";
import { ReportCellCollector } from "../report-cell-collector";

export class TimeSheetReportCollectorStrategy implements ReportCollectorStrategy {
  REPORT_TYPE: string = TIME_SHEET_REPORT;

  constructor(private reportCellCollector: ReportCellCollector) {
  }

  fillCellWithValue(cell: ReportCellValue,
                    workDay: WorkDay,
                    dayTypeMap: Map<number, DayType>,
                    useReportLabel?: boolean): void {
    cell.style = this.getStyle(cell.date, false);
    cell.merge = false;
    const val = [];
    if (workDay) {
      if (workDay.actualDayTypeId) {
        val[0] = getCellValueExt(workDay, dayTypeMap, (workDay) => workDay.actualDayTypeId, useReportLabel);
        val[1] = getCellValueExt(workDay, dayTypeMap, (workDay) => workDay.scheduledDayTypeId, useReportLabel);
      } else {
        val[0] = calculateHoursByHasTime(workDay);
        val[1] = getCellValue(workDay, dayTypeMap, useReportLabel);
        if (val[0] == 0) val[0] = '';
      }
    }
    cell.value = val;
  }

  fillDisabledCell(cell: ReportCellValue) {
    cell.style = this.getStyle(cell.date, true);
    cell.merge = true;
    cell.value = ['', 'X'];
  }

  collectRowCellData(dto: EmployeeScheduleDTO,
                     calendarDays: CalendarDay[],
                     dayTypesMap: Map<number, DayType>,
                     positionName: string,
                     summations: SummationResult[],
                     useReportLabel?: boolean,
                     intervals?: RowInterval[]): ReportCellValue[] {
    if (!calendarDays || calendarDays.length <= 0) {
      return;
    }

    const result: ReportCellValue[] = [].concat([
      {
        merge: true,
        value: [null, 0],
        style: TimeSheetStyles.idCellStyle
      },
      {
        value: [getEmployeeShortName(dto.parent), positionName],
        style: [TimeSheetStyles.nameCellStyle, TimeSheetStyles.positionCellStyle]
      }
    ]);

    this.reportCellCollector.collectCells(this, dto, calendarDays, intervals, dayTypesMap, useReportLabel)
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
        width: 4
      },
      {
        value: 'П.І.Б.',
        style: TimeSheetStyles.nameHeaderCellStyle,
        merge: true,
        width: 25
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

}
