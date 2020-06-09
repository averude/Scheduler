import { RowCollector } from "../../../../../../lib/ngx-schedule-table/collectors/row-collector";
import { getEmployeeShortName } from "../../../../../../shared/utils/utils";
import { ShiftComposition } from "../../../../../../model/shift-composition";
import { WorkingTime } from "../../../../../../model/working-time";
import { SchedulerRowGroupData } from "../model/scheduler-row-group-data";
import { SchedulerRowData } from "../model/scheduler-row-data";
import { BasicDto } from "../../../../../../model/dto/basic-dto";
import { Employee } from "../../../../../../model/employee";
import { WorkDay } from "../../../../../../model/workday";

export class SchedulerRowCollector implements RowCollector<SchedulerRowGroupData, SchedulerRowData> {

  constructor(private schedule: BasicDto<Employee, WorkDay>[],
              private compositions: ShiftComposition[]) {}

  collect(rowGroup: SchedulerRowGroupData): SchedulerRowData[] {
    return this.getRowData(rowGroup.groupId, rowGroup.timeNorm, rowGroup.shiftsWorkingTime);
  }

  private getRowData(shiftId: number,
                     workingTimeNorm: number,
                     shiftsWorkingTime: WorkingTime[]): SchedulerRowData[] {
    return this.getEmployeeScheduleForShift(shiftId)
      .map(employeeSchedule => {
        let compositions  = this.getEmployeeShiftCompositions(employeeSchedule.parent.id);

        let isSubstitution = !compositions.find(value => !value.substitution && value.shiftId === shiftId);

        let row = new SchedulerRowData();
        row.id = employeeSchedule.parent.id;
        row.name = getEmployeeShortName(employeeSchedule.parent);
        row.position = employeeSchedule.parent.position.shortName;
        row.isSubstitution = isSubstitution;
        row.workDays = employeeSchedule.collection;
        if (isSubstitution) {
          row.timeNorm = this.getEmployeeMainShiftWorkingTime(employeeSchedule.parent.id, compositions, shiftsWorkingTime);
        } else {
          row.timeNorm = workingTimeNorm;
        }
        row.compositions = compositions;
        return row;
      });
  }

  private getEmployeeScheduleForShift(shiftId: number): BasicDto<Employee, WorkDay>[] {
    let employeeIds = this.compositions
      .filter(value => value.shiftId === shiftId)
      .map(value => value.employeeId);
    return this.schedule
      .filter(value => employeeIds.findIndex(id => value.parent.id === id) >= 0);
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
}
