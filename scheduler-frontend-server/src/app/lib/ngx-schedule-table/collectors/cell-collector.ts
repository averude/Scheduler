import { RowData } from "../model/data/row-data";
import { CellData } from "../model/data/cell-data";
import { CalendarDay } from "../model/calendar-day";

export abstract class CellCollector<T extends RowData, R extends CellData> {
  abstract collect(rowGroupId: number, rowData: T, daysInMonth: CalendarDay[]): R[];
}
