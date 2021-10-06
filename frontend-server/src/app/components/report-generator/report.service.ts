import { Inject, Injectable } from "@angular/core";
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
import { ReportData } from "./model/report-data";
import { REPORT_COLLECTOR_HANDLERS } from "./collectors/report-collector.module";
import { CollectorHandler } from "../../shared/collectors/collector-handler";
import { ReportTableSortingStrategy } from "../../shared/table-sorting-strategies/report-table-sorting-strategy";
import { TableDataCollector } from "../../shared/collectors/table-data-collector";

@Injectable()
export class ReportService {

  constructor(private tableDataCollector: TableDataCollector,
              @Inject(REPORT_COLLECTOR_HANDLERS) private handlers: CollectorHandler[],
              private tableSortingStrategy: ReportTableSortingStrategy,
              private reportGenerator: ReportGenerator,
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

    const collectorStrategy   = this.config.collectorStrategies.get(reportType);
    const reportDecorator     = this.config.decorators.get(reportType);
    const reportCreator       = this.config.creators.get(reportType);

    if (collectorStrategy && reportCreator && reportDecorator) {

      return reportDataObservable.pipe(mergeMap(initData => {
        this.statisticsColumnCompositor.composeResults(initData.summationDTOMap, summationColumns, initData.workingNorms);
        initData.summationColumns   = summationColumns;
        initData.useReportLabel     = reportOptions.useReportLabel;
        initData.collectorStrategy  = collectorStrategy;

        const reportData = new ReportData();
        reportData.tableData = this.tableDataCollector.collect(initData, this.handlers, this.tableSortingStrategy);
        reportData.decorationData = decorationData;
        reportData.reportMarkup = this.config.reportMarkups.get(reportType);

        return this.reportGenerator
          .generate(reportCreator, reportDecorator, reportData, initData.reportSheets, reportOptions);
      }));
    }
  }
}
