import { RowGroupData } from "../../../../../../lib/ngx-schedule-table/model/data/row-group-data";

export class SchedulerRowGroupData implements RowGroupData {
  groupId: number;
  groupName: string;
  timeNorm: number;
}
