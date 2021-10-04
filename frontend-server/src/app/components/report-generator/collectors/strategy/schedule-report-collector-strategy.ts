import { SCHEDULE_REPORT } from "../../model/report-types";
import { ReportCellValue, ReportHeaderCell } from "../../model/report-cell-value";
import { WorkDay } from "../../../../model/workday";
import { DayType } from "../../../../model/day-type";
import { getCellValue, getEmployeeShortName } from "../../../../shared/utils/utils";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { SummationColumn } from "../../../../model/summation-column";
import { ScheduleReportStyles } from "../../styles/schedule-report-styles";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { SummationResult } from "../../../../model/dto/employee-work-stat-dto";
import { RowInterval } from "../../../../model/ui/schedule-table/row-interval";
import { ReportCollectorStrategy } from "./report-collector-strategy";
import { ReportCellCollector } from "../report-cell-collector";

export class ScheduleReportCollectorStrategy implements ReportCollectorStrategy {
  REPORT_TYPE: string = SCHEDULE_REPORT;

  constructor(private reportCellCollector: ReportCellCollector) {
  }

  fillCellWithValue(cell: ReportCellValue,
                    workDay: WorkDay,
                    dayTypeMap: Map<number, DayType>,
                    useReportLabel?: boolean): void {
    cell.style = this.getStyle(cell.date, false);
    cell.value = workDay ? getCellValue(workDay, dayTypeMap, useReportLabel) : null;
  }

  fillDisabledCell(cell: ReportCellValue) {
    cell.style = this.getStyle(cell.date, true);
    cell.value = 'X';
  }

  public getHeaders(calendarDays: CalendarDay[],
                    summationColumns: SummationColumn[]): ReportHeaderCell[] {
    const headers: ReportHeaderCell[] = [].concat([
      {
        value: '№',
        style: ScheduleReportStyles.idHeaderCellStyle,
        merge: true,
        width: 4
      },
      {
        value: 'П.І.Б.',
        style: ScheduleReportStyles.nameHeaderCellStyle,
        merge: true,
        width: 20
      },
      {
        value: [null, 'Посада', null],
        style: ScheduleReportStyles.positionHeaderCellStyle,
        merge: false,
        width: 8
      },
    ]);

    calendarDays.forEach(day => headers.push({
      value: [null, null, day.dayOfMonth],
      style: this.getHeaderStyle(day),
      merge: false,
      width: 5
    }));

    summationColumns.map(column => headers.push({
      value: column.name,
      style: ScheduleReportStyles.sumHeaderCellStyle,
      merge: true
    }));

    return headers;
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
        value: 0,
        style: ScheduleReportStyles.idCellStyle
      },
      {
        value: getEmployeeShortName(dto.parent),
        style: ScheduleReportStyles.nameCellStyle
      },
      {
        value: positionName,
        style: ScheduleReportStyles.positionCellStyle
      }
    ]);

    this.reportCellCollector.collectCells(this, dto, calendarDays, intervals, dayTypesMap, useReportLabel)
      .forEach(cell => result.push(cell));

    summations.forEach(sum =>
      result.push({
        value: sum.value,
        style: ScheduleReportStyles.sumCellStyle
      }));

    return result;
  }

  private getHeaderStyle(day: CalendarDay) {
    let result = ScheduleReportStyles.scheduleHeaderCellStyle;
    if (day.weekend) {
      result = ScheduleReportStyles.weekendScheduleHeaderCellStyle;
    } else if (day.holiday) {
      result = ScheduleReportStyles.holidayScheduleHeaderCellStyle;
    }
    return result;
  }

  private getStyle(day: CalendarDay, disabled?: boolean) {
    let result = disabled ? ScheduleReportStyles.disabledScheduleCellStyle : ScheduleReportStyles.scheduleCellStyle;
    if (day.weekend) {
      result = disabled ? ScheduleReportStyles.disabledWeekendScheduleCellStyle : ScheduleReportStyles.weekendScheduleCellStyle;
    } else if (day.holiday) {
      result = disabled ? ScheduleReportStyles.disabledHolidayScheduleCellStyle : ScheduleReportStyles.holidayScheduleCellStyle;
    }
    return result;
  }
}
