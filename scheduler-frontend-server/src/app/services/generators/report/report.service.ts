import { Injectable } from "@angular/core";
import { ReportGenerator } from "./report-generator";
import { ReportDataCollector } from "./collector/report-data-collector";
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
import { ShiftCompositionService } from "../../http/shift-composition.service";
import { SummationColumn } from "../../../model/summation-column";

@Injectable()
export class ReportService {

  constructor(private reportGenerator: ReportGenerator,
              private reportCollector: ReportDataCollector,
              private paginationStrategy: ScheduleTablePaginationStrategy,
              private specialCalendarDateService: SpecialCalendarDateService,
              private scheduleService: ScheduleService,
              private dayTypeService: DayTypeService,
              private statisticsService: StatisticsService,
              private shiftCompositionService: ShiftCompositionService){}

  generateReport(date: Moment,
                 decorationData: DecorationData,
                 sortByShift: boolean,
                 summationColumns?: SummationColumn[]): Observable<Buffer> {
    const fromDate = date.clone().startOf('month').format('YYYY-MM-DD');
    const toDate   = date.clone().endOf('month').format('YYYY-MM-DD');

    const observables: Observable<any>[] = [
      this.specialCalendarDateService.getAll(fromDate, toDate),
      this.scheduleService.getAllByDate(fromDate, toDate),
      this.statisticsService.getSummationDto(fromDate, toDate),
      this.dayTypeService.getAll().pipe(map(values => values.sort((a, b) => a.id - b.id)))
    ];

    if (sortByShift) {
      observables.push(this.shiftCompositionService.getAll(fromDate, toDate))
    }

    return forkJoin(observables)
      .pipe(flatMap(values => {
        const daysInMonth = this.paginationStrategy.calcDaysInMonth(date, values[0]);
        const reportRowData = this.reportCollector
          .collect(daysInMonth, values[3], values[1], values[2], values[4], summationColumns.map(value => value.id));
        return this.reportGenerator
          .generate(daysInMonth, reportRowData, summationColumns, decorationData);
      })
    );
  }
}
