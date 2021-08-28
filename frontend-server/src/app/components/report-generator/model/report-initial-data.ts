import { EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";
import { ReportSheetDTO } from "../../../model/dto/report-sheet-dto";
import { IData } from "../../../model/datasource/initial-data";

export class ReportInitialData extends IData {
  summationDTOMap:  Map<number, EmployeeWorkStatDTO>;
  reportSheets:     ReportSheetDTO[];
}
