import { BasicDto } from "../../../../model/dto/basic-dto";
import { Employee } from "../../../../model/employee";
import { WorkDay } from "../../../../model/workday";
import { ReportRowData } from "../model/report-row-data";
import {
  binarySearch,
  getEmployeeShortName,
  roundToTwo,
  sortByPattern,
  uniqById
} from "../../../../shared/utils/utils";
import { DayType } from "../../../../model/day-type";
import { calculateWorkHoursByWorkDay } from "../../../../shared/utils/time-converter";
import { CellData } from "../../../../lib/ngx-schedule-table/model/data/cell-data";
import { SummationDto } from "../../../../model/dto/summation-dto";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { Injectable } from "@angular/core";
import { HOURS_SUM } from "../../../../model/summation-column";
import { ShiftComposition } from "../../../../model/shift-composition";

@Injectable()
export class ReportDataCollector {

  constructor() {}

  collect(dates: CalendarDay[],
          dayTypes: DayType[],
          schedule: BasicDto<Employee, WorkDay>[],
          summations: SummationDto[],
          compositions: ShiftComposition[],
          columnIds?: number[]): ReportRowData[] {
    if (compositions) {
      this.sort(schedule, compositions);
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
      .find(sum => sum.employee.id === dto.parent.id)
      .results;
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
        cell.value = this.getCellValue(workDay, dayTypes);
        sched_idx++;
      }
      result.push(cell);
    }

    return result;
  }

  private getCellValue(workDay: WorkDay, dayTypes: DayType[]) {
    if (dayTypes && workDay.dayTypeId) {
      let dayType = binarySearch(dayTypes, workDay.dayTypeId);
      if (dayType && dayType.label) {
        return dayType.label;
      }
    }

    return calculateWorkHoursByWorkDay(workDay);
  }

  private sort(schedule: BasicDto<Employee, WorkDay>[],
               compositions: ShiftComposition[]) {
    const employeeMainShiftCompositions = uniqById(
      compositions
        .filter(value => !value.substitution)
        .sort((a, b) => a.shiftId - b.shiftId),
      (element => element.employeeId)
    );
    sortByPattern(schedule, employeeMainShiftCompositions,
      ((arrayElement, patternElement) => arrayElement.parent.id === patternElement.employeeId));
  }
}
