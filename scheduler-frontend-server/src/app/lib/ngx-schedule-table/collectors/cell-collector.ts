import { RowData } from "../model/data/row-data";
import { CellData } from "../model/data/cell-data";
import { CalendarDay } from "../model/calendar-day";

export interface CellCollector<T extends RowData, R extends CellData> {
  collect(rowGroupId: number, rowData: T, daysInMonth: CalendarDay[]): R[];
}
