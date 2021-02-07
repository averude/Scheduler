import { Injectable } from "@angular/core";
import { ScheduleTablePaginationStrategy } from "../../../shared/paginators/pagination-strategy/schedule-table-pagination-strategy";
import { SpecialCalendarDateService } from "../../http/special-calendar-date.service";
import { ScheduleService } from "../../http/schedule.service";
import { DayTypeService } from "../../http/day-type.service";
import { StatisticsService } from "../../http/statistics.service";
import { forkJoin, Observable } from "rxjs";
import { map, mergeMap } from "rxjs/operators";
import { Moment } from "moment";
import { DecorationData } from "./model/decoration-data";
import { Buffer } from "exceljs";
import { SummationColumn } from "../../../model/summation-column";
import { WorkingNormService } from "../../http/working-norm.service";
import { ReportServiceConfig } from "./config/report-service-config";
import { ReportGenerator } from "./report-generator";
import { StatisticsColumnCompositor } from "../../../shared/compositor/statistics-column-compositor";
import { PositionService } from "../../http/position.service";
import { ShiftService } from "../../http/shift.service";
import { SummationMode } from "../../../model/dto/employee-work-stat-dto";
import { ReportSheetDTOService } from "../../http/report-sheet-dto.service";
import { AuthService } from "../../http/auth.service";
import { ScheduleSourcesService } from "../../collectors/schedule/auth-strategy/schedule-sources.service";

@Injectable()
export class ReportService {

  constructor(private authService: AuthService,
              private paginationStrategy: ScheduleTablePaginationStrategy,
              private reportGenerator: ReportGenerator,
              private statisticsColumnCompositor: StatisticsColumnCompositor,
              private config: ReportServiceConfig,
              private specialCalendarDateService: SpecialCalendarDateService,
              private scheduleService: ScheduleService,
              private dayTypeService: DayTypeService,
              private reportSheetDTOService: ReportSheetDTOService,
              private shiftService: ShiftService,
              private positionService: PositionService,
              private statisticsService: StatisticsService,
              private workingNormService: WorkingNormService,
              private scheduleSourcesService: ScheduleSourcesService){}

  generateReport(reportType: string,
                 date: Moment,
                 decorationData: DecorationData,
                 summationColumns?: SummationColumn[],
                 useReportLabel?: boolean,
                 divideBySubDep?: boolean): Observable<Buffer> {
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

      const userAccount = this.authService.currentUserAccount;
      let observables = this.scheduleSourcesService.getSourcesByUserAccount(from, to, userAccount);

      observables = observables.concat([
        this.specialCalendarDateService.getAll(from, to),
        this.statisticsService.getSummationDTO(from, to, SummationMode.PER_POSITION),
        this.dayTypeService.getAll().pipe(map(values => values.sort((a, b) => a.id - b.id))),
        this.shiftService.getAll(),
        this.positionService.getAll()
      ]);

      const accessRights = this.authService.currentUserValue.accessRights;
      if (accessRights.isDepartmentLevel && accessRights.isAdmin) {
        observables.push(this.reportSheetDTOService.getAll());
      }

      return forkJoin(observables)
        .pipe(mergeMap((
          [schedule, workingNorms, calendarDays,
            summationDTO, dayTypes, shifts,
            positions, reportSheets]) => {

          const daysInMonth = this.paginationStrategy.calcDaysInMonth(date, calendarDays);
          this.statisticsColumnCompositor.composeResults(summationDTO, summationColumns, workingNorms);

          const reportData = reportDataCollector.collect(daysInMonth, dayTypes, shifts,
            positions, schedule, summationDTO, summationColumns, useReportLabel);
          reportData.decorationData = decorationData;

          return this.reportGenerator
              .generate(reportCreator, reportDecorator, reportData, reportSheets, divideBySubDep);

        }));
    }
  }
}
