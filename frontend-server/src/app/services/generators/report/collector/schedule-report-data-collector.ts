import { AbstractReportDataCollector } from "./abstract-report-data-collector";
import { WorkDay } from "../../../../model/workday";
import { DayType } from "../../../../model/day-type";
import { getCellValue, getEmployeeShortName } from "../../../../shared/utils/utils";
import { SCHEDULE_REPORT } from "../model/report-types";
import { ReportCellData, ReportHeaderCell } from "../model/report-cell-data";
import { ScheduleReportStyles } from "../styles/schedule-report-styles";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { Employee } from "../../../../model/employee";
import { SummationResult } from "../../../../model/dto/summation-dto";
import { SummationColumn } from "../../../../model/summation-column";
import { ReportData } from "../model/report-row-data";
import { ReportMarkup } from "../model/report-markup";
import { BasicDto } from "../../../../model/dto/basic-dto";

export class ScheduleReportDataCollector extends AbstractReportDataCollector {

  REPORT_TYPE: string = SCHEDULE_REPORT;

  fillCellWithValue(cell: ReportCellData,
                    workDay: WorkDay,
                    dayTypes: DayType[]): void {
    cell.value = getCellValue(workDay, dayTypes);
  }

  public getHeaders(calendarDays: CalendarDay[],
                    summationColumns: SummationColumn[]): ReportHeaderCell[] {
    const headers: ReportHeaderCell[] = [].concat([
      {
        value: '№',
        style: ScheduleReportStyles.idHeaderCellStyle,
        merge: true,
        width: 3
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
        value: index + 1,
        style: ScheduleReportStyles.idCellStyle
      },
      {
        value: getEmployeeShortName(dto.parent),
        style: ScheduleReportStyles.nameCellStyle
      },
      {
        value: dto.parent.position.shortName,
        style: ScheduleReportStyles.positionCellStyle
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
