import { ShiftComposition } from "../../../model/shift-composition";
import { DayType } from "../../../model/day-type";
import { DayTypeGroup } from "../../../model/day-type-group";
import { CalendarDay } from "../../../model/ui/calendar-day";
import { CellData } from "../../../model/ui/cell-data";
import { WorkDay } from "../../../model/workday";
import { isBetween } from "../../../modules/admin/schedule/components/calendar/utils/schedule-table-utils";

export class CellDataCollector {

  getCells(employeeId: number,
           shiftId: number,
           isSubstitution: boolean,
           shiftComposition: ShiftComposition[],
           schedule: WorkDay[],
           dayTypes: DayType[],
           dayTypeGroups: DayTypeGroup[],
           daysInMonth: CalendarDay[]): CellData[] {
    return this.getCellData(daysInMonth, dayTypes, dayTypeGroups, employeeId, shiftId, isSubstitution, shiftComposition, schedule);
  }

  private getCellData(calendarDays: CalendarDay[],
              dayTypes: DayType[],
              dayTypeGroups: DayTypeGroup[],
              employeeId: number,
              shiftId: number,
              isSubstitution: boolean,
              shiftComposition: ShiftComposition[],
              schedule: WorkDay[]): CellData[] {
    let shiftSchedules;
    let fn;
    if (isSubstitution) {
      shiftSchedules = this.getSubstitutionShiftComposition(employeeId, shiftId, shiftComposition);
      fn = this.forSubstitution;
    } else {
      shiftSchedules = this.getEmployeeNotInShiftComposition(employeeId, shiftId, shiftComposition);
      fn = this.forMain;
    }
    return this.getCellDataForShift(calendarDays, dayTypes, dayTypeGroups, employeeId, shiftId, isSubstitution, shiftSchedules, schedule, fn);
  }

  private getCellDataForShift(calendarDays: CalendarDay[],
                      dayTypes: DayType[],
                      dayTypeGroups: DayTypeGroup[],
                      employeeId: number,
                      shiftId: number,
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

        let cell = {
          day: day,
          workDay: null,
          enabled: !isSubstitution,
          dayTypeGroups: dayTypeGroups,
          dayTypes: dayTypes
        };

        let workDay = schedule[workDayIndex];
        if (workDay && day.isoString === workDay.date) {
          workDayIndex++;
          onCellSet(shiftComposition, cell, workDay);
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
      if (isBetween(cell.day.isoString, value.from, value.to)) {
        cell.workDay = workDay;
        cell.enabled = true;
      }
    })
  };

  private forMain = (shiftComposition: ShiftComposition[],
                     cell: CellData,
                     workDay: WorkDay) => {
    cell.workDay = workDay;
    shiftComposition.forEach(value => {
      if (isBetween(cell.day.isoString, value.from, value.to)) {
        cell.enabled = false;
        cell.workDay = null;
      }
    });
  };
}
