import { Shift } from "../../../../../../model/shift";
import { ShiftSchedule } from "../../../../../../model/shift-schedule";
import { Employee } from "../../../../../../model/employee";
import { ScheduleDto } from "../../../../../../model/dto/schedule-dto";
import { Position } from "../../../../../../model/position";
import { ShiftPattern } from "../../../../../../model/shift-pattern";
import { DayType } from "../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../model/day-type-group";
import { WorkingTime } from "../../../../../../model/working-time";
import { CalendarDay } from "../../../../../../model/ui/calendar-day";
import { RowGroupData } from "../../../../../../model/ui/row-group-data";
import { RowData } from "../../../../../../model/ui/row-data";
import { CellData } from "../../../../../../model/ui/cell-data";
import { WorkDay } from "../../../../../../model/workday";
import { isBetween } from "./schedule-table-utils";
import { Injectable } from "@angular/core";

@Injectable()
export class DataTransformer {

  private shifts:             Shift[]         = [];
  private shiftSchedule:      ShiftSchedule[] = [];
  private employees:          Employee[]      = [];
  private schedule:           ScheduleDto[]   = [];
  private positions:          Position[]      = [];
  private patterns:           ShiftPattern[]  = [];
  private dayTypes:           DayType[]       = [];
  private dayTypeGroups:      DayTypeGroup[]  = [];
  private shiftsWorkingTime:  WorkingTime[]   = [];
  private daysInMonth:        CalendarDay[]   = [];


  constructor() {}

  getData(shifts: Shift[],
          shiftSchedule: ShiftSchedule[],
          employees: Employee[],
          schedule: ScheduleDto[],
          positions: Position[],
          patterns: ShiftPattern[],
          dayTypes: DayType[],
          dayTypeGroups: DayTypeGroup[],
          shiftsWorkingTime: WorkingTime[],
          daysInMonth: CalendarDay[]): RowGroupData[] {
    this.shifts = shifts;
    this.shiftSchedule = shiftSchedule;
    this.employees = employees;
    this.schedule = schedule;
    this.positions = positions;
    this.patterns = patterns;
    this.dayTypes = dayTypes;
    this.dayTypeGroups = dayTypeGroups;
    this.shiftsWorkingTime = shiftsWorkingTime;
    this.daysInMonth = daysInMonth;
    return this.getRowGroupData(this.shifts);
  }

  getRowGroupData(shifts: Shift[]): RowGroupData[] {
    return shifts.map(shift => {
      let rowGroup = new RowGroupData();
      let shiftWorkingTime = this.getShiftWorkingTime(shift.id) ? this.getShiftWorkingTime(shift.id).hours : 0;
      rowGroup.shift = shift;
      rowGroup.workingTimeNorm = shiftWorkingTime;
      rowGroup.rows = this.getRowData(shift.id, shiftWorkingTime);
      return rowGroup;
    })
  }

  getShiftWorkingTime(shiftId: number): WorkingTime {
    return this.shiftsWorkingTime.find(workingTime => workingTime.shiftId === shiftId);
  }

  getRowData(shiftId: number,
             workingTimeNorm: number): RowData[] {
    let rowData = this.getNewShiftEmployees(shiftId).map(employee => {
      let row = new RowData();
      row.employee = employee;
      row.position = this.getPosition(employee);
      row.cells = this.getCells(employee.id, shiftId, this.daysInMonth);
      row.workingTimeNorm = workingTimeNorm;
      return row;
    });
    return rowData;
  }

  getNewShiftEmployees(shiftId: number): Employee[] {
    let employeeIds = this.shiftSchedule
      .filter(value => value.shiftId === shiftId)
      .map(value => value.employeeId);
    return this.employees
      .filter(value => employeeIds.findIndex(id => value.id === id) >= 0);
  }

  getPosition(employee: Employee): Position {
    return this.positions.find(position => position.id === employee.positionId);
  }

  getCells(employeeId: number, shiftId: number, daysInMonth: CalendarDay[]): CellData[] {
    return this.getCellData(daysInMonth, this.getSomeShitInTheHouse(employeeId, shiftId));
  }

  getCellData(calendarDays: CalendarDay[], schedule: WorkDay[]): CellData[] {
    if (!schedule || !calendarDays || schedule.length > calendarDays.length) {
      return;
    }

    let cellData: CellData[] = [];
    for (let dayIndex = 0, schedIndex = 0; dayIndex < calendarDays.length; dayIndex++) {

      let workDay     = schedule[schedIndex];
      let calendarDay = calendarDays[dayIndex];

      if (workDay && calendarDay.isoString === workDay.date) {
        schedIndex++;
        cellData.push({
          day: calendarDay,
          workDay: workDay,
          dayTypeGroups: this.dayTypeGroups,
          dayTypes: this.dayTypes
        });
      } else {
        cellData.push({
          day: calendarDay,
          workDay: null,
          dayTypeGroups: this.dayTypeGroups,
          dayTypes: this.dayTypes
        });
      }
    }

    return cellData;
  }

  // The algorithm needs to be reviewed
  getSomeShitInTheHouse(employeeId: number, shiftId: number): WorkDay[] {

    let ss = this.shiftSchedule.find(value => !value.substitution && value.shiftId === shiftId);
    if (ss && !ss.substitution) {
      return this.filterSchedule(employeeId, shiftId);
    } else {
      return this.filter(employeeId, shiftId);
    }
  }

  private filter(employeeId: number, shiftId: number): WorkDay[] {
    let shiftSchedules = this.shiftSchedule
      .filter(value => value.employeeId === employeeId && value.substitution && value.shiftId === shiftId);
    let dto = this.schedule
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

  private filterSchedule(employeeId: number, shiftId: number): WorkDay[] {
    let shiftSchedules = this.shiftSchedule
      .filter(value => value.employeeId === employeeId && value.shiftId !== shiftId);
    let sdto = this.schedule.find(schedule => schedule.employeeId === employeeId);
    if (sdto) {
      return this.recursivelyDo(sdto.workDays, shiftSchedules, shiftSchedules.length);
    }
  }

  private recursivelyDo(array: WorkDay[], limits: ShiftSchedule[], i: number): any  {
    if (i == 0) {
      return array;
    } else {
      i--;
      let limit = limits[i];
      return this.recursivelyDo(array.filter(value => !isBetween(value.date, limit.from, limit.to)), limits, i);
    }
  }
}
