import { ShiftSchedule } from "../../../model/shift-schedule";
import { ScheduleDto } from "../../../model/dto/schedule-dto";
import { Employee } from "../../../model/employee";
import { Position } from "../../../model/position";
import { DayType } from "../../../model/day-type";
import { DayTypeGroup } from "../../../model/day-type-group";
import { CalendarDay } from "../../../model/ui/calendar-day";
import { RowData } from "../../../model/ui/row-data";
import { CellDataCollector } from "./cell-data-collector";

export class RowDataCollector {

  constructor(private cellDataCollector: CellDataCollector) {
  }

  getRowData(shiftId: number,
             shiftSchedule: ShiftSchedule[],
             schedule: ScheduleDto[],
             employees: Employee[],
             positions: Position[],
             dayTypes: DayType[],
             dayTypeGroups: DayTypeGroup[],
             daysInMonth: CalendarDay[],
             workingTimeNorm: number): RowData[] {
    let rowData = this.getNewShiftEmployees(shiftId, shiftSchedule, employees)
      .map(employee => {
        let row = new RowData();
        row.employee = employee;
        row.position = this.getPosition(employee, positions);
        row.cells = this.cellDataCollector
          .getCells(employee.id, shiftId, shiftSchedule, schedule, dayTypes, dayTypeGroups, daysInMonth);
        row.workingTimeNorm = workingTimeNorm;
        return row;
      });
    return rowData;
  }

  getNewShiftEmployees(shiftId: number,
                       shiftSchedule: ShiftSchedule[],
                       employees: Employee[]): Employee[] {
    let employeeIds = shiftSchedule
      .filter(value => value.shiftId === shiftId)
      .map(value => value.employeeId);
    return employees
      .filter(value => employeeIds.findIndex(id => value.id === id) >= 0);
  }

  getPosition(employee: Employee, positions: Position[]): Position {
    return positions.find(position => position.id === employee.positionId);
  }
}
