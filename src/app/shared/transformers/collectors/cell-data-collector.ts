import { ShiftSchedule } from "../../../model/shift-schedule";
import { ScheduleDto } from "../../../model/dto/schedule-dto";
import { DayType } from "../../../model/day-type";
import { DayTypeGroup } from "../../../model/day-type-group";
import { CalendarDay } from "../../../model/ui/calendar-day";
import { CellData } from "../../../model/ui/cell-data";
import { WorkDay } from "../../../model/workday";
import { isBetween } from "../../../modules/admin/schedule/components/calendar/utils/schedule-table-utils";

export class CellDataCollector {

  getCells(employeeId: number,
           shiftId: number,
           shiftSchedule: ShiftSchedule[],
           schedule: ScheduleDto[],
           dayTypes: DayType[],
           dayTypeGroups: DayTypeGroup[],
           daysInMonth: CalendarDay[]): CellData[] {
    // return this.getCellData(daysInMonth, dayTypes, dayTypeGroups,
    //   this.getSchedule(employeeId, shiftId, shiftSchedule, schedule));

    return this.allTogether(daysInMonth, dayTypes, dayTypeGroups,employeeId, shiftId, shiftSchedule, schedule);
  }

  private getCellData(calendarDays: CalendarDay[],
                      dayTypes: DayType[],
                      dayTypeGroups: DayTypeGroup[],
                      workDays: WorkDay[]): CellData[] {
    if (!workDays || !calendarDays || workDays.length > calendarDays.length) {
      return;
    }

    const shiftSchedule: ShiftSchedule[] = [];

    let cellData: CellData[] = [];
    for (let dayIndex = 0, schedIndex = 0; dayIndex < calendarDays.length; dayIndex++) {

      let workDay = workDays[schedIndex];
      let calendarDay = calendarDays[dayIndex];

      if (workDay && calendarDay.isoString === workDay.date) {
        schedIndex++;
        cellData.push({
          day: calendarDay,
          workDay: workDay,
          enabled: true,
          dayTypeGroups: dayTypeGroups,
          dayTypes: dayTypes
        });
      } else {

        cellData.push({
          day: calendarDay,
          workDay: null,
          enabled: true,
          dayTypeGroups: dayTypeGroups,
          dayTypes: dayTypes
        });
      }
    }

    return cellData;
  }

  // The algorithm needs to be reviewed
  private getSchedule(employeeId: number,
                      shiftId: number,
                      shiftSchedule: ShiftSchedule[],
                      schedule: ScheduleDto[]): WorkDay[] {

    let ss = shiftSchedule.find(value => !value.substitution && value.shiftId === shiftId);
    if (ss && !ss.substitution) {
      return this.filterSchedule(employeeId, shiftId, shiftSchedule, schedule);
    } else {
      return this.filter(employeeId, shiftId, shiftSchedule, schedule);
    }
  }

  private filter(employeeId: number,
                 shiftId: number,
                 shiftSchedule: ShiftSchedule[],
                 schedule: ScheduleDto[]): WorkDay[] {
    let shiftSchedules = shiftSchedule
      .filter(value => value.employeeId === employeeId && value.substitution && value.shiftId === shiftId);
    let dto = schedule
      .find(schedule => schedule.employeeId === employeeId);
    if (dto) {
      return dto.workDays
        .filter(workDay => {
          for (let i = 0; i < shiftSchedules.length; i++) {
            let ss = shiftSchedules[i];
            if (isBetween(workDay.date, ss.from, ss.to)) {
              return true;
            }
          }
        });
    }
  }

  private filterSchedule(employeeId: number,
                         shiftId: number,
                         shiftSchedule: ShiftSchedule[],
                         schedule: ScheduleDto[]): WorkDay[] {
    let shiftSchedules = shiftSchedule
      .filter(value => value.employeeId === employeeId && value.shiftId !== shiftId);
    let sdto = schedule.find(schedule => schedule.employeeId === employeeId);
    if (sdto) {
      return this.recursivelyDo(sdto.workDays, shiftSchedules, shiftSchedules.length);
    }
  }

  private recursivelyDo(array: WorkDay[], limits: ShiftSchedule[], i: number): any {
    if (i == 0) {
      return array;
    } else {
      i--;
      let limit = limits[i];
      return this.recursivelyDo(array.filter(value => !isBetween(value.date, limit.from, limit.to)), limits, i);
    }
  }

  allTogether(calendarDays: CalendarDay[],
              dayTypes: DayType[],
              dayTypeGroups: DayTypeGroup[],
              employeeId: number,
              shiftId: number,
              shiftSchedule: ShiftSchedule[],
              schedule: ScheduleDto[]): CellData[] {
    shiftSchedule.filter(value => value.shiftId === shiftId);

    let ss = shiftSchedule.find(value => !value.substitution && value.shiftId === shiftId);

    let workDays: WorkDay[] = [];

    if (ss && !ss.substitution) {
      let shiftSchedules = shiftSchedule
        .filter(value => value.employeeId === employeeId && value.shiftId !== shiftId);
      let sdto = schedule.find(schedule => schedule.employeeId === employeeId);
      if (sdto) {
        workDays = this.recursivelyDo(sdto.workDays, shiftSchedules, shiftSchedules.length);
      }
    } else {
      let shiftSchedules = shiftSchedule
        .filter(value => value.employeeId === employeeId && value.substitution && value.shiftId === shiftId);
      let dto = schedule
        .find(schedule => schedule.employeeId === employeeId);
      if (dto) {
        workDays = dto.workDays
          .filter(workDay => {
            for (let i = 0; i < shiftSchedules.length; i++) {
              let ss = shiftSchedules[i];
              if (isBetween(workDay.date, ss.from, ss.to)) {
                return true;
              }
            }
          });
      }
    }

    if (!workDays || !calendarDays || workDays.length > calendarDays.length) {
      return;
    }

    let cellData: CellData[] = [];
    for (let dayIndex = 0, schedIndex = 0; dayIndex < calendarDays.length; dayIndex++) {

      let workDay = workDays[schedIndex];
      let calendarDay = calendarDays[dayIndex];

      if (workDay && calendarDay.isoString === workDay.date) {
        schedIndex++;
        cellData.push({
          day: calendarDay,
          workDay: workDay,
          enabled: true,
          dayTypeGroups: dayTypeGroups,
          dayTypes: dayTypes
        });
      } else {

        cellData.push({
          day: calendarDay,
          workDay: null,
          enabled: true,
          dayTypeGroups: dayTypeGroups,
          dayTypes: dayTypes
        });
      }
    }

    return cellData;
  }
}
