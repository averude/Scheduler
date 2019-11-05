import { CalendarDay } from "./calendar-day";
import { WorkDay } from "../workday";
import { DayTypeGroup } from "../day-type-group";
import { DayType } from "../day-type";

export interface CellData {
  day: CalendarDay;
  workDay: WorkDay;
  enabled: boolean;
  dayTypeGroups: DayTypeGroup[];
  dayTypes: DayType[];
}
