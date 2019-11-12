import { Employee } from "../employee";
import { Position } from "../position";
import { WorkDay } from "../workday";
import { ShiftComposition } from "../shift-composition";
import { CalendarDay } from "./calendar-day";
import { DayType } from "../day-type";
import { DayTypeGroup } from "../day-type-group";

export class RowData {
  daysInMonth: CalendarDay[];
  employee:     Employee;
  position:     Position;
  workDays:     WorkDay[];
  workingTimeNorm:  number;
  isSubstitution: boolean;
  composition: ShiftComposition[];
  dayTypes: DayType[];
  dayTypeGroups: DayTypeGroup[];
}
