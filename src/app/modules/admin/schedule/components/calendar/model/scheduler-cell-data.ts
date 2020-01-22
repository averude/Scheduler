import { CellData } from "../../../../../../lib/ngx-schedule-table/model/data/cell-data";
import { CalendarDay } from "../../../../../../lib/ngx-schedule-table/model/calendar-day";
import { WorkDay } from "../../../../../../model/workday";
import { DayType } from "../../../../../../model/day-type";
import { DayTypeGroup } from "../../../../../../model/day-type-group";

export class SchedulerCellData implements CellData {
  date: CalendarDay;
  enabled: boolean;
  value: WorkDay;
  dayTypes: DayType[];
  dayTypeGroups: DayTypeGroup[];
}
