import { isBetween } from "./schedule-table-utils";
import { WorkDay } from "../../../../../../model/workday";
import { ShiftComposition } from "../../../../../../model/shift-composition";

export interface ScheduleFilter {
  filter(shiftId: number, employeeId: number, schedule: WorkDay[], shiftSchedule: ShiftComposition[]);
}

export class SubstitutionScheduleFilter implements ScheduleFilter{
  filter(shiftId: number,
         employeeId: number,
         schedule: WorkDay[],
         shiftSchedule: ShiftComposition[]) {
    let shiftSchedules = shiftSchedule
      .filter(value => value.employeeId === employeeId && value.substitution && value.shiftId === shiftId);
    return schedule.filter(workDay => {
        for (let i = 0; i < shiftSchedules.length; i++) {
          let ss = shiftSchedules[i];
          if (isBetween(workDay.date, ss.from, ss.to)) {
            return true;
          }
        }
      });
  }
}

export class RecursiveScheduleFilter implements ScheduleFilter {

  filter(shiftId: number, employeeId: number, schedule: WorkDay[], shiftSchedule: ShiftComposition[]) {
    let shiftSchedules = shiftSchedule
      .filter(value => value.employeeId === employeeId && value.shiftId !== shiftId);
    return this.recursivelyDo(schedule, shiftSchedules, shiftSchedules.length);
  }

  private recursivelyDo(array: WorkDay[], limits: ShiftComposition[], i: number): any  {
    if (i == 0) {
      return array;
    } else {
      i--;
      let limit = limits[i];
      return this.recursivelyDo(array
        .filter(value => !isBetween(value.date, limit.from, limit.to)), limits, i);
    }
  }
}
