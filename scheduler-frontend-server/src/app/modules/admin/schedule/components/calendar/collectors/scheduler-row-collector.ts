import { RowCollector } from "../../../../../../lib/ngx-schedule-table/collectors/row-collector";
import { getEmployeeShortName } from "../../../../../../shared/utils/utils";
import { ShiftComposition } from "../../../../../../model/shift-composition";
import { WorkingTime } from "../../../../../../model/working-time";
import { SchedulerRowGroupData } from "../model/scheduler-row-group-data";
import { SchedulerRowData } from "../model/scheduler-row-data";
import { EmployeeScheduleDto } from "../../../../../../model/dto/basic-dto";

export class SchedulerRowCollector implements RowCollector<SchedulerRowGroupData, SchedulerRowData> {

  constructor(private schedule: EmployeeScheduleDto[],
              private compositions: ShiftComposition[]) {}

  collect(rowGroup: SchedulerRowGroupData): SchedulerRowData[] {
    return this.getRowData(rowGroup.groupId, rowGroup.timeNorm, rowGroup.shiftsWorkingTime);
  }

  private getRowData(shiftId: number,
                     workingTimeNorm: number,
                     shiftsWorkingTime: WorkingTime[]): SchedulerRowData[] {
    return this.getEmployeeScheduleForShift(shiftId)
      .map(employeeSchedule => {
        let compositions  = this.getEmployeeShiftCompositions(employeeSchedule.entity.id);

        let isSubstitution = !compositions.find(value => !value.substitution && value.shiftId === shiftId);

        let row = new SchedulerRowData();
        row.id = employeeSchedule.entity.id;
        row.name = getEmployeeShortName(employeeSchedule.entity);
        row.position = employeeSchedule.entity.position.shortName;
        row.isSubstitution = isSubstitution;
        row.workDays = employeeSchedule.collection;
        if (isSubstitution) {
          row.timeNorm = this.getEmployeeMainShiftWorkingTime(employeeSchedule.entity.id, compositions, shiftsWorkingTime);
        } else {
          row.timeNorm = workingTimeNorm;
        }
        row.compositions = compositions;
        return row;
      });
  }

  private getEmployeeScheduleForShift(shiftId: number): EmployeeScheduleDto[] {
    let employeeIds = this.compositions
      .filter(value => value.shiftId === shiftId)
      .map(value => value.employeeId);
    return this.schedule
      .filter(value => employeeIds.findIndex(id => value.entity.id === id) >= 0);
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
