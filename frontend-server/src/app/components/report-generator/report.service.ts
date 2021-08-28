import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { DecorationData } from "./model/decoration-data";
import { Buffer } from "exceljs";
import { SummationColumn } from "../../model/summation-column";
import { ReportServiceConfig } from "./config/report-service-config";
import { ReportGenerator } from "./report-generator";
import { StatisticsColumnCompositor } from "../../shared/compositor/statistics-column-compositor";
import { ReportOptions } from "./model/report-options";
import { ReportInitialData } from "./model/report-initial-data";

@Injectable()
export class ReportService {

  constructor(private reportGenerator: ReportGenerator,
              private statisticsColumnCompositor: StatisticsColumnCompositor,
              private config: ReportServiceConfig){}

  generate(reportDataObservable: Observable<ReportInitialData>,
           decorationData: DecorationData,
           reportType: string,
           reportOptions?: ReportOptions,
           summationColumns?: SummationColumn[]): Observable<Buffer> {
    if (!this.config) {
      console.error('No report configuration provided');
      return;
    }

    const reportDataCollector = this.config.collectors.get(reportType);
    const reportDecorator     = this.config.decorators.get(reportType);
    const reportCreator       = this.config.creators.get(reportType);

    if (reportDataCollector && reportCreator && reportDecorator) {

      return reportDataObservable.pipe(mergeMap(data => {
        this.statisticsColumnCompositor.composeResults(data.summationDTOMap, summationColumns, data.workingNorms);

        const collectedData = reportDataCollector.collect(data, summationColumns, reportOptions.useReportLabel);
        collectedData.decorationData = decorationData;

        return this.reportGenerator
          .generate(reportCreator, reportDecorator, collectedData,
            data.reportSheets, reportOptions.divideBySubDep);
      }));
    }
  }
}
