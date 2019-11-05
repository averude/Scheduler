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
    return this.getCellData(daysInMonth, dayTypes, dayTypeGroups, employeeId, shiftId, shiftSchedule, schedule)
  }

  getCellData(calendarDays: CalendarDay[],
              dayTypes: DayType[],
              dayTypeGroups: DayTypeGroup[],
              employeeId: number,
              shiftId: number,
              shiftSchedule: ShiftSchedule[],
              schedule: ScheduleDto[]): CellData[] {
    let mainShiftSchedule = shiftSchedule.find(value => !value.substitution && value.shiftId === shiftId);
    if (mainShiftSchedule && !mainShiftSchedule.substitution) {
      return this.getCellDataForMainShift(calendarDays, dayTypes, dayTypeGroups, employeeId, shiftId, shiftSchedule, schedule);
    } else {
      return this.getCellDataForSubstitutionShift(calendarDays, dayTypes, dayTypeGroups, employeeId, shiftId, shiftSchedule, schedule);
    }
  }

  getCellDataForSubstitutionShift(calendarDays: CalendarDay[],
                                  dayTypes: DayType[],
                                  dayTypeGroups: DayTypeGroup[],
                                  employeeId: number,
                                  shiftId: number,
                                  shiftSchedule: ShiftSchedule[],
                                  schedule: ScheduleDto[]): CellData[] {

    let shiftSchedules  = this.getSubstitutionShiftSchedules(employeeId, shiftId, shiftSchedule);
    let workDays        = this.getScheduleByEmployeeId(employeeId, schedule);
    let cells: CellData[];
    if (workDays) {
      let workDayIndex = 0;
      cells = calendarDays.map(day => {
        let workDay = workDays[workDayIndex];
        let cell = {
          day: day,
          workDay: null,
          enabled: false,
          dayTypeGroups: dayTypeGroups,
          dayTypes: dayTypes
        };

        if (workDay && day.isoString === workDay.date) {
          workDayIndex++;
          for (let i = 0; i < shiftSchedules.length; i++) {
            let ss = shiftSchedules[i];
            if (!cell.enabled && isBetween(cell.day.isoString, ss.from, ss.to)) {
              cell.workDay = workDay;
              cell.enabled = true;
            }
          }
        }
        return cell;
      });
      return cells;
    }
  }

  getCellDataForMainShift(calendarDays: CalendarDay[],
                          dayTypes: DayType[],
                          dayTypeGroups: DayTypeGroup[],
                          employeeId: number,
                          shiftId: number,
                          shiftSchedule: ShiftSchedule[],
                          schedule: ScheduleDto[]): CellData[] {
    let shiftSchedules  = this.getEmployeeNotInShiftSchedule(employeeId, shiftId, shiftSchedule);
    let workDays        = this.getScheduleByEmployeeId(employeeId, schedule);
    let cells: CellData[];
    if (workDays) {
      let workDayIndex = 0;
      cells = calendarDays.map(day => {
        let workDay = workDays[workDayIndex];
        let cell = {
          day: day,
          workDay: null,
          enabled: true,
          dayTypeGroups: dayTypeGroups,
          dayTypes: dayTypes
        };

        if (workDay && day.isoString === workDay.date) {
          workDayIndex++;
          cell.workDay = workDay;

          shiftSchedules.forEach(value => {
            if (isBetween(day.isoString, value.from, value.to)) {
              cell.enabled = false;
              cell.workDay = null;
            }
          })
        }
        return cell;
      });
    }
    return cells;
  }

  private getScheduleByEmployeeId(employeeId: number, scheduleDto: ScheduleDto[]): WorkDay[] {
    let dto = scheduleDto.find(schedule => schedule.employeeId === employeeId);
    if (dto) {
      return dto.workDays;
    }
  }

  private getSubstitutionShiftSchedules(employeeId: number,
                                        shiftId: number,
                                        shiftSchedule: ShiftSchedule[]): ShiftSchedule[] {
    return shiftSchedule
      .filter(value =>
        value.employeeId === employeeId && value.substitution && value.shiftId === shiftId);
  }

  private getEmployeeNotInShiftSchedule(employeeId: number,
                                        shiftId: number,
                                        shiftSchedule: ShiftSchedule[]) {
    return shiftSchedule
      .filter(value => value.employeeId === employeeId && value.shiftId !== shiftId);
  }
}
