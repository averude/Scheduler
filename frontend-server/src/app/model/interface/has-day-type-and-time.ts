import { HasTime } from "./has-time";
import { DayType } from "../day-type";

export interface HasDayTypeAndTime extends HasTime {
  dayType: DayType;
}
