import { Injectable } from "@angular/core";
import { ShiftComposition } from "../../../../../../model/shift-composition";
import { CalendarDay } from "../../../../../../model/ui/calendar-day";
import * as moment from "moment";

@Injectable()
export class ScheduleTableUtils {
  isCellWritable(shiftSchedule: ShiftComposition, day: CalendarDay): boolean {
    return moment(day.isoString)
      .isBetween(moment(shiftSchedule.from),moment(shiftSchedule.to), 'day', '[]');
  }
}

export function isBetween(value: string, from: string, to: string): boolean {
  return moment(value).isBetween(moment(from), moment(to),'day', '[]');
}
