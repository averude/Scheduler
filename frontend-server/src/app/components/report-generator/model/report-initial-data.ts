import { SpecialCalendarDate } from "../../../model/special-calendar-date";
import { EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";
import { ReportSheetDTO } from "../../../model/dto/report-sheet-dto";
import { IData } from "../../../model/datasource/initial-data";

export class ReportInitialData extends IData {
  summationDTOs:  EmployeeWorkStatDTO[];
  reportSheets:   ReportSheetDTO[];

  specialCalendarDates: SpecialCalendarDate[];
}
