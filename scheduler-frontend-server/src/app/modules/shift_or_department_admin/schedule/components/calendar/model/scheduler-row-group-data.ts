import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";
import { WorkingTime } from "../../../../../../model/working-time";

export class SchedulerRowGroupData implements RowGroupData {
  groupId: number;
  groupName: string;
  timeNorm: number;
  shiftsWorkingTime: WorkingTime[];
}
