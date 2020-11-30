import { Injectable } from "@angular/core";
import { ScheduleTablePaginationStrategy } from "../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { SpecialCalendarDateService } from "../../http/special-calendar-date.service";
import { ScheduleService } from "../../http/schedule.service";
import { DayTypeService } from "../../http/day-type.service";
import { StatisticsService } from "../../http/statistics.service";
import { forkJoin, Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { Moment } from "moment";
import { DecorationData } from "./model/decoration-data";
import { Buffer } from "exceljs";
import { MainShiftCompositionService } from "../../http/main-shift-composition.service";
import { SummationColumn } from "../../../model/summation-column";
import { WorkingNormService } from "../../http/working-norm.service";
import { ReportServiceConfig } from "./config/report-service-config";
import { ReportGenerator } from "./report-generator";
import { StatisticsColumnCompositor } from "../../../shared/compositor/statistics-column-compositor";

@Injectable()
export class ReportService {

  constructor(private paginationStrategy: ScheduleTablePaginationStrategy,
              private reportGenerator: ReportGenerator,
              private statisticsColumnCompositor: StatisticsColumnCompositor,
              private config: ReportServiceConfig,
              private specialCalendarDateService: SpecialCalendarDateService,
              private scheduleService: ScheduleService,
              private dayTypeService: DayTypeService,
              private statisticsService: StatisticsService,
              private shiftCompositionService: MainShiftCompositionService,
              private workingNormService: WorkingNormService){}

  generateReport(reportType: string,
                 date: Moment,
                 decorationData: DecorationData,
                 summationColumns?: SummationColumn[]): Observable<Buffer> {
    if (!this.config) {
      console.error('No report configuration provided');
      return;
    }

    const from = date.clone().startOf('month').format('YYYY-MM-DD');
    const to   = date.clone().endOf('month').format('YYYY-MM-DD');

    const reportDataCollector = this.config.collectors.get(reportType);
    const reportDecorator     = this.config.decorators.get(reportType);
    const reportCreator       = this.config.creators.get(reportType);

    if (reportDataCollector && reportCreator && reportDecorator) {

      const observables: Observable<any>[] = [
        this.specialCalendarDateService.getAll(from, to),
        this.scheduleService.getAllByDate(from, to),
        this.statisticsService.getSummationDto(from, to),
        this.dayTypeService.getAll().pipe(map(values => values.sort((a, b) => a.id - b.id))),
        this.workingNormService.getAll(from, to),
        this.shiftCompositionService.getAll(from, to)
      ];

      return forkJoin(observables)
        .pipe(flatMap(values => {
          const daysInMonth = this.paginationStrategy.calcDaysInMonth(date, values[0]);
          this.statisticsColumnCompositor.composeResults(values[2], summationColumns, values[5], values[4]);

          const reportData = reportDataCollector.collect(daysInMonth, values[3], values[1], values[2], summationColumns, values[5]);
          reportData.decorationData = decorationData;

          return this.reportGenerator
              .generate(reportCreator, reportDecorator, reportData);
        }));
    }
  }
}
