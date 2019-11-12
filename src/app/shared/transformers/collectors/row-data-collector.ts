import { ShiftComposition } from "../../../model/shift-composition";
import { ScheduleDto } from "../../../model/dto/schedule-dto";
import { Employee } from "../../../model/employee";
import { Position } from "../../../model/position";
import { DayType } from "../../../model/day-type";
import { DayTypeGroup } from "../../../model/day-type-group";
import { CalendarDay } from "../../../model/ui/calendar-day";
import { RowData } from "../../../model/ui/row-data";
import { WorkDay } from "../../../model/workday";
import { WorkingTime } from "../../../model/working-time";

export class RowDataCollector {

  getRowData(shiftId: number,
             shiftComposition: ShiftComposition[],
             schedule: ScheduleDto[],
             employees: Employee[],
             positions: Position[],
             dayTypes: DayType[],
             dayTypeGroups: DayTypeGroup[],
             daysInMonth: CalendarDay[],
             workingTimeNorm: number,
             shiftsWorkingTime: WorkingTime[]): RowData[] {
    return this.getEmployeesInShift(shiftId, shiftComposition, employees)
      .map(employee => {
        let composition = this.getEmployeeShiftComposition(employee.id, shiftComposition);
        let workDays    = this.getScheduleByEmployeeId(employee.id, schedule);

        let isSubstitution = !composition.find(value => !value.substitution && value.shiftId === shiftId);

        let row = new RowData();
        row.daysInMonth = daysInMonth;
        row.employee = employee;
        row.position = this.getPosition(employee, positions);
        row.isSubstitution = isSubstitution;
        row.workDays = workDays;
        if (isSubstitution) {
          row.workingTimeNorm = this.getEmployeeMainShiftWorkingTime(employee.id, composition, shiftsWorkingTime);
        } else {
          row.workingTimeNorm = workingTimeNorm;
        }
        row.composition = composition;
        row.dayTypes = dayTypes;
        row.dayTypeGroups = dayTypeGroups;
        return row;
      });
  }

  getEmployeesInShift(shiftId: number,
                      shiftSchedule: ShiftComposition[],
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

  getEmployeeShiftComposition(employeeId: number,
                              shiftComposition: ShiftComposition[]): ShiftComposition[] {
    return shiftComposition.filter(value => value.employeeId === employeeId);
  }

  getEmployeeMainShiftWorkingTime(employeeId: number,
                                  compositions: ShiftComposition[],
                                  shiftsWorkingTime: WorkingTime[]): number {
    let shiftComposition = compositions.find(value => !value.substitution && value.employeeId === employeeId);
    return shiftComposition ? this.getShiftWorkingTime(shiftComposition.shiftId, shiftsWorkingTime) : 0;
  }

  getShiftWorkingTime(shiftId: number,
                      shiftsWorkingTime: WorkingTime[]): number {
    let workingTime = shiftsWorkingTime.find(workingTime => workingTime.shiftId === shiftId);
    return workingTime ? workingTime.hours : 0;
  }

  private getScheduleByEmployeeId(employeeId: number, scheduleDto: ScheduleDto[]): WorkDay[] {
    let dto = scheduleDto.find(schedule => schedule.employeeId === employeeId);
    if (dto) {
      return dto.workDays;
    }
  }
}
