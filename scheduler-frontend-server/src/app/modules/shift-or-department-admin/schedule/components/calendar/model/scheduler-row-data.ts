import { RowData } from "../../../../../../lib/ngx-schedule-table/model/data/row-data";
import { ShiftComposition } from "../../../../../../model/shift-composition";
import { WorkDay } from "../../../../../../model/workday";

export class SchedulerRowData implements RowData {
  id: number;
  name: string;
  position: string;
  timeNorm: number;
  isSubstitution: boolean;
  workDays: WorkDay[];
  compositions: ShiftComposition[];
}
