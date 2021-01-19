import { AbstractReportDataCollector } from "./abstract-report-data-collector";
import { WorkDay } from "../../../model/workday";
import { DayType } from "../../../model/day-type";
import { getCellValue, getEmployeeShortName } from "../../../shared/utils/utils";
import { SCHEDULE_REPORT } from "../../generators/report/model/report-types";
import { ReportCellData, ReportHeaderCell } from "../../generators/report/model/report-cell-data";
import { ScheduleReportStyles } from "../../generators/report/styles/schedule-report-styles";
import { CalendarDay } from "../../../lib/ngx-schedule-table/model/calendar-day";
import { SummationResult } from "../../../model/dto/summation-dto";
import { SummationColumn } from "../../../model/summation-column";
import { ReportData } from "../../generators/report/model/report-row-data";
import { ReportMarkup } from "../../generators/report/model/report-markup";
import { EmployeeScheduleDTO } from "../../../model/dto/employee-schedule-dto";
import { CellEnabledSetter } from "../schedule/cell-enabled-setter";
import { RowInterval } from "../../../model/ui/schedule-table/row-interval";
import { IntervalCreator } from "../../creator/interval-creator.service";
import { CellCollector } from "../cell-collector";

export class ScheduleReportDataCollector extends AbstractReportDataCollector {

  REPORT_TYPE: string = SCHEDULE_REPORT;

  constructor(intervalCreator: IntervalCreator,
              cellEnabledSetter: CellEnabledSetter,
              cellCollector: CellCollector) {
    super(intervalCreator, cellEnabledSetter, cellCollector);
  }

  fillCellWithValue(cell: ReportCellData,
                    workDay: WorkDay,
                    dayTypes: DayType[],
                    useReportLabel?: boolean): void {
    cell.style = this.getStyle(cell.date, false);
    cell.value = getCellValue(workDay, dayTypes, useReportLabel);
  }

  fillDisabledCell(cell: ReportCellData) {
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
        value: index + 1,
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

    this.collectCells(dto, calendarDays, intervals, dayTypes, useReportLabel)
      .forEach(cell => result.push(cell));

    summations.forEach(sum =>
      result.push({
        value: sum.value,
        style: ScheduleReportStyles.sumCellStyle
      }));

    return result;
  }

  afterDataInsert(data: ReportData) {
    data.reportMarkup = {
      sheet_row_start_num: 2,
      sheet_col_start_num: 2,
      table_header_height: 2,
      table_creator_interval: 4,
      table_data_row_step: 1,
      table_cols_before_data: 3,
      table_report_label: 'ГРАФІК'
    } as ReportMarkup;

    data.tableData.forEach((value, index) => value.reportCellData[0].value = index + 1);
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
