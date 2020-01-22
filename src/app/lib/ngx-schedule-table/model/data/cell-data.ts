import { CalendarDay } from "../calendar-day";

export interface CellData {
  date: CalendarDay;
  enabled: boolean;
  value: any;
}
