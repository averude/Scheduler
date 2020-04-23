import { CellCollector } from "../../../../../../lib/ngx-schedule-table/collectors/cell-collector";
import { CalendarDay } from "../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { ShiftComposition } from "../../../../../../model/shift-composition";
import { WorkDay } from "../../../../../../model/workday";
import { isBetween } from "../../../../../../lib/ngx-schedule-table/utils/table-utils";
import { SchedulerRowData } from "../model/scheduler-row-data";
import { CellData } from "../../../../../../lib/ngx-schedule-table/model/data/cell-data";
import { Injectable } from "@angular/core";

@Injectable()
export class SchedulerCellCollector extends CellCollector<SchedulerRowData, CellData> {

  collect(rowGroupId: number,
          rowData: SchedulerRowData,
          daysInMonth: CalendarDay[]): CellData[] {
    return this.getCellData(rowData.id, rowGroupId, rowData.isSubstitution, rowData.compositions, rowData.workDays, daysInMonth);
  }

  private getCellData(employeeId: number,
                      shiftId: number,
                      isSubstitution: boolean,
                      shiftComposition: ShiftComposition[],
                      schedule: WorkDay[],
                      calendarDays: CalendarDay[]): CellData[] {
    let shiftSchedules;
    let fn;
    if (isSubstitution) {
      shiftSchedules = this.getSubstitutionShiftComposition(employeeId, shiftId, shiftComposition);
      fn = this.forSubstitution;
    } else {
      shiftSchedules = this.getEmployeeNotInShiftComposition(employeeId, shiftId, shiftComposition);
      fn = this.forMain;
    }
    return this.getCellDataForShift(calendarDays, isSubstitution, shiftSchedules, schedule, fn);
  }

  private getCellDataForShift(calendarDays: CalendarDay[],
                              isSubstitution: boolean,
                              shiftComposition: ShiftComposition[],
                              schedule: WorkDay[],
                              onCellSet: (shiftComposition: ShiftComposition[],
                                          cell: CellData,
                                          workDay: WorkDay) => void): CellData[] {
    let cells: CellData[];
    if (schedule) {
      let workDayIndex = 0;
      cells = calendarDays.map(day => {

        let cell: CellData = {
          date: day,
          value: null,
          enabled: !isSubstitution,
        };

        let workDay = schedule[workDayIndex];

        if (workDay && day.isoString === workDay.date) {
          workDayIndex++;
          onCellSet(shiftComposition, cell, workDay);
        } else {
          onCellSet(shiftComposition, cell, null);
        }
        return cell;
      });
      return cells;
    }
  }

  private getSubstitutionShiftComposition(employeeId: number,
                                          shiftId: number,
                                          shiftComposition: ShiftComposition[]): ShiftComposition[] {
    return shiftComposition
      .filter(value =>
        value.employeeId === employeeId && value.substitution && value.shiftId === shiftId);
  }

  private getEmployeeNotInShiftComposition(employeeId: number,
                                           shiftId: number,
                                           shiftComposition: ShiftComposition[]) {
    return shiftComposition
      .filter(value => value.employeeId === employeeId && value.shiftId !== shiftId);
  }

  private forSubstitution = (shiftComposition: ShiftComposition[],
                             cell: CellData,
                             workDay: WorkDay) => {
    shiftComposition.forEach(value => {
      if (isBetween(cell.date.isoString, value.from, value.to)) {
        cell.value = workDay;
        cell.enabled = true;
      }
    })
  };

  private forMain = (shiftComposition: ShiftComposition[],
                     cell: CellData,
                     workDay: WorkDay) => {
    cell.value = workDay;
    shiftComposition.forEach(value => {
      if (isBetween(cell.date.isoString, value.from, value.to)) {
        cell.enabled = false;
        cell.value = null;
      }
    });
  };
}
