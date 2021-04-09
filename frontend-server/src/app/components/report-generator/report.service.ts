import { Injectable } from "@angular/core";
import { ScheduleTablePaginationStrategy } from "../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { DecorationData } from "./model/decoration-data";
import { Buffer } from "exceljs";
import { SummationColumn } from "../../model/summation-column";
import { ReportServiceConfig } from "./config/report-service-config";
import { ReportGenerator } from "./report-generator";
import { StatisticsColumnCompositor } from "../../shared/compositor/statistics-column-compositor";
import { ReportOptions } from "./model/report-options";
import { ReportData } from "./model/report-data";
import { Moment } from "moment";

@Injectable()
export class ReportService {

  constructor(private paginationStrategy: ScheduleTablePaginationStrategy,
              private reportGenerator: ReportGenerator,
              private statisticsColumnCompositor: StatisticsColumnCompositor,
              private config: ReportServiceConfig){}

  generate(date: Moment,
           reportDataObservable: Observable<ReportData>,
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
        const daysInMonth = this.paginationStrategy.calcDaysInMonth(date, data.calendarDays);
        this.statisticsColumnCompositor.composeResults(data.summationDTO, summationColumns, data.workingNorms);

        const collectedData = reportDataCollector.collect(daysInMonth, data.dayTypes, data.shifts,
          data.positions, data.schedule, data.summationDTO, summationColumns, reportOptions.useReportLabel);
        collectedData.decorationData = decorationData;

        return this.reportGenerator
          .generate(reportCreator, reportDecorator, collectedData,
            data.reportSheets, reportOptions.divideBySubDep);
      }));
    }
  }
}
