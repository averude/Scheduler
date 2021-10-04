import { EmployeeWorkStatDTO } from "../../../model/dto/employee-work-stat-dto";
import { ReportSheetDTO } from "../../../model/dto/report-sheet-dto";
import { IData } from "../../../model/datasource/initial-data";
import { SummationColumn } from "../../../model/summation-column";
import { ReportCollectorStrategy } from "../collectors/strategy/report-collector-strategy";

export class ReportInitialData extends IData {
  summationDTOMap:  Map<number, EmployeeWorkStatDTO>;
  reportSheets:     ReportSheetDTO[];
  summationColumns: SummationColumn[];
  useReportLabel:   boolean;
  collectorStrategy: ReportCollectorStrategy;
}
