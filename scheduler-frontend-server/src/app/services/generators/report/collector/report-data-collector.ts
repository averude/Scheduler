import { BasicDto } from "../../../../model/dto/basic-dto";
import { Employee } from "../../../../model/employee";
import { WorkDay } from "../../../../model/workday";
import { ReportRowData } from "../model/report-row-data";
import { getCellValue, getEmployeeShortName, roundToTwo } from "../../../../shared/utils/utils";
import { DayType } from "../../../../model/day-type";
import { CellData } from "../../../../lib/ngx-schedule-table/model/data/cell-data";
import { SummationDto, SummationResult } from "../../../../model/dto/summation-dto";
import { CalendarDay } from "../../../../lib/ngx-schedule-table/model/calendar-day";
import { Injectable } from "@angular/core";
import { HOURS_SUM } from "../../../../model/summation-column";
import { ShiftComposition } from "../../../../model/shift-composition";
import { WorkingNorm } from "../../../../model/working-norm";
import { sortByPattern, uniqById } from "../../../../shared/utils/collection-utils";

@Injectable()
export class ReportDataCollector {

  constructor() {}

  collect(dates: CalendarDay[],
          dayTypes: DayType[],
          schedule: BasicDto<Employee, WorkDay>[],
          summations: SummationDto[],
          norms: WorkingNorm[],
          compositions: ShiftComposition[],
          columnIds?: number[]): ReportRowData[] {
    if (compositions) {
      // sortByCompositions(schedule, compositions);
    }

    const employeeMainShiftCompositions = uniqById(
      compositions
        .filter(value => !value.substitution)
        .sort((a, b) => a.shiftId - b.shiftId),
      (element => element.employeeId)
    );
    sortByPattern(schedule, employeeMainShiftCompositions,
      ((arrayElement, patternElement) => arrayElement.parent.id === patternElement.employeeId));
    schedule = schedule.slice(0, employeeMainShiftCompositions.length);

    return schedule.map(dto => {
      const reportRowData = new ReportRowData();
      reportRowData.name = getEmployeeShortName(dto.parent);
      reportRowData.position = dto.parent.position.shortName;
      reportRowData.cellData = this.getCellData(dto.collection, dates, dayTypes);
      reportRowData.summationResults = this.getSummationResults(summations, dto, columnIds);

      let employeeComposition = employeeMainShiftCompositions
        .find(value => value.employeeId === dto.parent.id);
      if (employeeComposition && employeeComposition.shiftId) {
        let daysNorm = norms
          .find(value => value.shiftId === employeeComposition.shiftId)
          .days;
        reportRowData.summationResults.push(<SummationResult>{value: daysNorm});
      }

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
