import { SCHEDULE_REPORT } from "../../model/report-types";
import { ReportCellValue, ReportHeaderCell } from "../../model/report-cell-value";
import { WorkDay } from "../../../../model/workday";
import { getCellValue, getEmployeeShortName } from "../../../../shared/utils/utils";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { ScheduleReportStyles } from "../../styles/schedule-report-styles";
import { EmployeeScheduleDTO } from "../../../../model/dto/employee-schedule-dto";
import { SummationResult } from "../../../../model/dto/employee-work-stat-dto";
import { ReportCollectorStrategy } from "./report-collector-strategy";
import { ReportCellCollector } from "../report-cell-collector";
import { ReportInitialData } from "../../model/report-initial-data";
import { HasEmployeePosition } from "../../model/has-employee-position";

export class ScheduleReportCollectorStrategy implements ReportCollectorStrategy {
  REPORT_TYPE: string = SCHEDULE_REPORT;

  constructor(private reportCellCollector: ReportCellCollector) {
  }

  fillCellWithValue(cell: ReportCellValue,
                    workDay: WorkDay,
                    initData: ReportInitialData): void {
    cell.style = this.getStyle(cell.date, false);
    cell.value = workDay ? getCellValue(workDay, initData.dayTypeMap, initData.useReportLabel) : null;
  }

  fillDisabledCell(cell: ReportCellValue) {
    cell.style = this.getStyle(cell.date, true);
    cell.value = 'X';
  }

  public getHeaders(initData: ReportInitialData): ReportHeaderCell[] {
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

    initData.calendarDays.forEach(day => headers.push({
      value: [null, null, day.dayOfMonth],
      style: this.getHeaderStyle(day),
      merge: false,
      width: 5
    }));

    initData.summationColumns.map(column => headers.push({
      value: column.name,
      style: ScheduleReportStyles.sumHeaderCellStyle,
      merge: true
    }));

    return headers;
  }

  collectRowCellData(dto: EmployeeScheduleDTO,
                     initData: ReportInitialData,
                     rowValue: HasEmployeePosition,
                     summations: SummationResult[]): ReportCellValue[] {
    if (!initData.calendarDays || initData.calendarDays.length <= 0) {
      return;
    }

    const result: ReportCellValue[] = [].concat([
      {
        value: 0,
        style: ScheduleReportStyles.idCellStyle
      },
      {
        value: getEmployeeShortName(dto.employee),
        style: ScheduleReportStyles.nameCellStyle
      },
      {
        value: rowValue.position?.shortName,
        style: ScheduleReportStyles.positionCellStyle
      }
    ]);

    this.reportCellCollector.collectCells(this, dto, initData, rowValue.intervals)
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
