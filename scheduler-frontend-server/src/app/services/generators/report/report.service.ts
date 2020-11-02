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
import { ShiftCompositionService } from "../../http/shift-composition.service";
import { HOURS_SUM, SummationColumn } from "../../../model/summation-column";
import { WorkingNormService } from "../../http/working-norm.service";
import { ReportServiceConfig } from "./config/report-service-config";
import { ReportGenerator } from "./report-generator";
import { sortByPattern, uniqById } from "../../../shared/utils/collection-utils";
import { SummationDto, SummationResult } from "../../../model/dto/summation-dto";
import { ShiftComposition } from "../../../model/shift-composition";
import { WorkingNorm } from "../../../model/working-norm";
import { roundToTwo } from "../../../shared/utils/utils";

@Injectable()
export class ReportService {

  constructor(private paginationStrategy: ScheduleTablePaginationStrategy,
              private reportGenerator: ReportGenerator,
              private config: ReportServiceConfig,
              private specialCalendarDateService: SpecialCalendarDateService,
              private scheduleService: ScheduleService,
              private dayTypeService: DayTypeService,
              private statisticsService: StatisticsService,
              private shiftCompositionService: ShiftCompositionService,
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
    const reportMarkup        = this.config.markups.get(reportType);

    if (reportDataCollector && reportCreator && reportDecorator && reportMarkup) {

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
          this.foo(values[2], summationColumns, values[5], values[4]);

          const reportRowData = reportDataCollector
              .collect(daysInMonth, values[3], values[1], values[2], values[5]);
            return this.reportGenerator
              .generate(reportCreator, reportDecorator, reportRowData, daysInMonth, summationColumns, decorationData, reportMarkup);
          })
        );
    }
  }

  private foo(summationDtos: SummationDto[],
              summationColumns: SummationColumn[],
              shiftCompositions: ShiftComposition[],
              workingNorms: WorkingNorm[]) {
    let mainShiftCompositions = uniqById(shiftCompositions
      .filter(value => !value.substitution), value => value.employeeId);

    for (let i = 0; i < summationDtos.length; i++) {
      try {
        const dto = summationDtos[i];
        const shiftId = mainShiftCompositions.find(value => value.employeeId === dto.parent.id).shiftId;
        const norm = workingNorms.find(value => value.shiftId === shiftId);
        dto.collection.push({summationColumnId: -1, value: norm.hours} as SummationResult);
        dto.collection.push({summationColumnId: -2, value: norm.days} as SummationResult);

        sortByPattern(dto.collection, summationColumns, (result, column) => {
          if (result.type === HOURS_SUM) result.value = roundToTwo(result.value / 60);
          return result.summationColumnId == column.id;
        });
      } finally {}
    }
  }
}
