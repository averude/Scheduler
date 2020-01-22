import { RowCollector } from "../../../../../../lib/ngx-schedule-table/collectors/row-collector";
import { Employee } from "../../../../../../model/employee";
import { Position } from "../../../../../../model/position";
import { binarySearch, getEmployeeShortName } from "../../../../../../shared/utils/utils";
import { ShiftComposition } from "../../../../../../model/shift-composition";
import { WorkingTime } from "../../../../../../model/working-time";
import { WorkDay } from "../../../../../../model/workday";
import { SchedulerRowGroupData } from "../model/scheduler-row-group-data";
import { SchedulerRowData } from "../model/scheduler-row-data";
import { ScheduleDto } from "../../../../../../model/dto/schedule-dto";

export class SchedulerRowCollector implements RowCollector<SchedulerRowGroupData, SchedulerRowData> {

  constructor(private schedule: ScheduleDto[],
              private employees: Employee[],
              private positions: Position[],
              private shiftsWorkingTime: WorkingTime[],
              private compositions: ShiftComposition[]) {
  }

  collect(rowGroup: SchedulerRowGroupData): SchedulerRowData[] {
    return this.getRowData(rowGroup.groupId, rowGroup.timeNorm);
  }

  private getRowData(shiftId: number,
                     workingTimeNorm: number): SchedulerRowData[] {
    return this.getEmployeesInShift(shiftId)
      .map(employee => {
        let compositions  = this.getEmployeeShiftCompositions(employee.id);
        let workDays      = this.getScheduleByEmployeeId(employee.id);

        let isSubstitution = !compositions.find(value => !value.substitution && value.shiftId === shiftId);

        let row = new SchedulerRowData();
        row.id = employee.id;
        row.name = getEmployeeShortName(employee);
        row.position = this.getPositionName(employee);
        row.isSubstitution = isSubstitution;
        row.workDays = workDays;
        if (isSubstitution) {
          row.timeNorm = this.getEmployeeMainShiftWorkingTime(employee.id, compositions, this.shiftsWorkingTime);
        } else {
          row.timeNorm = workingTimeNorm;
        }
        row.compositions = compositions;
        return row;
      });
  }

  private getEmployeesInShift(shiftId: number): Employee[] {
    let employeeIds = this.compositions
      .filter(value => value.shiftId === shiftId)
      .map(value => value.employeeId);
    return this.employees
      .filter(value => employeeIds.findIndex(id => value.id === id) >= 0);
  }

  private getPositionName(employee: Employee): string {
    let position = binarySearch<Position>(this.positions, employee.positionId);
    if (position) {
      return position.shortName;
    } else {
      return '';
    }
  }

  private getEmployeeShiftCompositions(employeeId: number): ShiftComposition[] {
    return this.compositions.filter(value => value.employeeId === employeeId);
  }

  private getEmployeeMainShiftWorkingTime(employeeId: number,
                                          shiftCompositions: ShiftComposition[],
                                          shiftsWorkingTime: WorkingTime[]): number {
    let shiftComposition = shiftCompositions.find(value => !value.substitution && value.employeeId === employeeId);
    return shiftComposition ? this.getShiftWorkingTime(shiftComposition.shiftId, shiftsWorkingTime) : 0;
  }

  private getShiftWorkingTime(shiftId: number,
                              shiftsWorkingTime: WorkingTime[]): number {
    let workingTime = shiftsWorkingTime.find(workingTime => workingTime.shiftId === shiftId);
    return workingTime ? workingTime.hours : 0;
  }

  private getScheduleByEmployeeId(employeeId: number): WorkDay[] {
    let dto = this.schedule.find(schedule => schedule.employeeId === employeeId);
    if (dto) {
      return dto.workDays;
    }
  }
}
