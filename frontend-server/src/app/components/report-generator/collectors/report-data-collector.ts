import { ReportData } from "../model/report-data";
import { SummationColumn } from "../../../model/summation-column";
import { ReportInitialData } from "../model/report-initial-data";

export interface ReportDataCollector {

  collect(initialData: ReportInitialData,
          summationColumns: SummationColumn[],
          useReportLabel: boolean): ReportData

  REPORT_TYPE: string;
}
