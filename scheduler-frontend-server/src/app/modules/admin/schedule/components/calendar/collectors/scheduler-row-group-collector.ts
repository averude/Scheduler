import { RowGroupCollector } from "../../../../../../lib/ngx-schedule-table/collectors/row-group-collector";
import { SchedulerRowGroupData } from "../model/scheduler-row-group-data";
import { WorkingTime } from "../../../../../../model/working-time";
import { Shift } from "../../../../../../model/shift";

export class SchedulerRowGroupCollector implements RowGroupCollector<SchedulerRowGroupData> {

  constructor(private shifts: Shift[],
              private workingTime: WorkingTime[]) {}

  collect(): SchedulerRowGroupData[] {
    return this.shifts.map(shift => {
      let rowGroup = new SchedulerRowGroupData();
      let shiftWorkingTime = this.getShiftWorkingTime(shift.id);
      rowGroup.groupId = shift.id;
      rowGroup.groupName = shift.name;
      rowGroup.timeNorm = shiftWorkingTime;
      rowGroup.shiftsWorkingTime = this.workingTime;
      return rowGroup;
    });
  }

  private getShiftWorkingTime(shiftId: number): number {
    let workingTime = this.workingTime.find(workingTime => workingTime.shiftId === shiftId);
    return workingTime ? workingTime.hours : 0;
  }
}
