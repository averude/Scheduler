import { BasicDto } from "../../../../model/dto/basic-dto";
import { Employee } from "../../../../model/employee";
import { WorkDay } from "../../../../model/workday";
import { ReportRowData } from "../model/report-row-data";
import { getCellValue, getEmployeeShortName, roundToTwo, sortBy } from "../../../../shared/utils/utils";
import { DayType } from "../../../../model/day-type";
import { CellData } from "../../../../lib/ngx-schedule-table/model/data/cell-data";
import { SummationDto } from "../../../../model/dto/summation-dto";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { Injectable } from "@angular/core";
import { HOURS_SUM } from "../../../../model/summation-column";
import { ShiftComposition } from "../../../../model/shift-composition";
import { WorkingTime } from "../../../../model/working-time";

@Injectable()
export class ReportDataCollector {

  constructor() {}

  collect(dates: CalendarDay[],
          dayTypes: DayType[],
          schedule: BasicDto<Employee, WorkDay>[],
          summations: SummationDto[],
          norms: WorkingTime[],
          compositions: ShiftComposition[],
          columnIds?: number[]): ReportRowData[] {
    if (compositions) {
      sortBy(schedule, compositions);
      schedule = schedule.slice(0, compositions.length);
    }

    return schedule.map(dto => {
      const reportRowData = new ReportRowData();
      reportRowData.name = getEmployeeShortName(dto.parent);
      reportRowData.position = dto.parent.position.shortName;
      reportRowData.cellData = this.getCellData(dto.collection, dates, dayTypes);
      reportRowData.summationResults = this.getSummationResults(summations, dto, columnIds);

      return reportRowData;
    })
  }

  private getSummationResults(summations: SummationDto[],
                              dto: BasicDto<Employee, WorkDay>,
                              columnIds?: number[]) {
    let summationResults = summations
      .find(sum => sum.parent.id === dto.parent.id)
      .collection;
    if (columnIds) {
      summationResults = summationResults
        .filter(value => columnIds.indexOf(value.summationColumnId) >= 0);
    }
    summationResults.filter(value => value.type === HOURS_SUM)
      .forEach(value => value.value = roundToTwo(value.value / 60));
    return summationResults;
  }

  private getCellData(workDays: WorkDay[],
                      dates: CalendarDay[],
                      dayTypes: DayType[]): CellData[] {
    const result = [];
    if (!workDays || !dates || dates.length == 0) {
      return result;
    }

    for (let date_idx = 0, sched_idx = 0; date_idx < dates.length; date_idx++) {
      const date = dates[date_idx];
      const cell = <CellData> {date: date};
      const workDay = workDays[sched_idx];

      if (workDay && date.isoString === workDay.date) {
        cell.value = getCellValue(workDay, dayTypes);
        sched_idx++;
      }
      result.push(cell);
    }

    return result;
  }
}
